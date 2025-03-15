import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

interface UserWithPassword {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  image: string | null;
}

export const hashPassword = async (password: string) => {
  return await hash(password, 12);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const createUser = async (email: string, password: string, name?: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password);
  
  return prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name || email.split('@')[0],
    },
  });
};

export const createAdminUser = async () => {
  const adminEmail = "admin@app.com";
  const adminPassword = "pass1234";

  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
      select: {
        id: true,
        email: true,
        role: true,
      }
    });

    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin);
      return existingAdmin;
    }

    const hashedPassword = await hashPassword(adminPassword);
    
    const newAdmin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Admin",
        role: "ADMIN",
        emailVerified: new Date(),
      },
      select: {
        id: true,
        email: true,
        role: true,
      }
    });
    
    console.log("Admin user created successfully:", newAdmin);
    return newAdmin;
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error;
  }
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            password: true,
            role: true,
          }
        });

        if (!user) {
          console.error("User not found:", credentials.email);
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          console.error("User has no password:", user.email);
          throw new Error("Please use the login method you used to create your account");
        }

        const isPasswordValid = await verifyPassword(credentials.password, user.password);

        if (!isPasswordValid) {
          console.error("Invalid password for user:", user.email);
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        
        if (!existingUser) {
          // Create a new user with Google credentials
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              image: user.image,
              emailVerified: new Date(), // Mark as verified since it's Google
            },
          });
        } else {
          // Update existing user with Google information
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              emailVerified: new Date(),
              name: user.name || existingUser.name,
              image: user.image || existingUser.image,
            },
          });
        }
      }
      return true;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        // Initial sign in
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.role = (user as any).role;
      }

      if (account) {
        token.provider = account.provider;
      }

      // Return previous token if the user hasn't changed
      const existingUser = await prisma.user.findUnique({
        where: { email: token.email! },
      });

      if (!existingUser) {
        return token;
      }

      return {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        picture: existingUser.image,
        provider: token.provider,
        role: existingUser.role,
      };
    },
  },
}; 