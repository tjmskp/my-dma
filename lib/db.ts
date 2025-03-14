import { PrismaClient } from "@prisma/client";
import type { User as FirebaseUser } from 'firebase/auth';

declare global {
  var cachedPrisma: PrismaClient;
}

export let db: PrismaClient;
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  db = global.cachedPrisma;
}

interface ProviderData {
  provider: string;
  accessToken: string | null;
  refreshToken?: string;
  expiresAt?: number;
  scope?: string;
  tokenType?: string;
}

export async function createOrUpdateUser(
  firebaseUser: FirebaseUser,
  providerData: ProviderData | null = null
) {
  const { uid, email, displayName, photoURL } = firebaseUser;

  const user = await db.user.upsert({
    where: { email: email || undefined },
    update: {
      name: displayName || undefined,
      image: photoURL || undefined,
      emailVerified: firebaseUser.emailVerified ? new Date() : null,
    },
    create: {
      id: uid,
      email: email || undefined,
      name: displayName || undefined,
      image: photoURL || undefined,
      emailVerified: firebaseUser.emailVerified ? new Date() : null,
    },
  });

  if (providerData) {
    await db.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: providerData.provider,
          providerAccountId: uid,
        },
      },
      update: {
        access_token: providerData.accessToken,
        refresh_token: providerData.refreshToken,
        expires_at: providerData.expiresAt,
        scope: providerData.scope,
        token_type: providerData.tokenType,
      },
      create: {
        userId: user.id,
        type: 'oauth',
        provider: providerData.provider,
        providerAccountId: uid,
        access_token: providerData.accessToken,
        refresh_token: providerData.refreshToken,
        expires_at: providerData.expiresAt,
        scope: providerData.scope,
        token_type: providerData.tokenType,
      },
    });
  }

  return user;
}

export async function getUserById(id: string) {
  return db.user.findUnique({
    where: { id },
    include: {
      accounts: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return db.user.findUnique({
    where: { email },
    include: {
      accounts: true,
    },
  });
} 