import { createAdminUser } from '../lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting admin user creation...');
    
    // Verify database connection
    await prisma.$connect();
    console.log('Database connection successful');

    // Create admin user
    const admin = await createAdminUser();
    console.log('Admin user operation completed:', admin);

    // Verify admin exists in database
    const verifyAdmin = await prisma.user.findUnique({
      where: { email: 'admin@app.com' },
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
      }
    });

    if (verifyAdmin) {
      console.log('Verified admin user exists in database:', {
        id: verifyAdmin.id,
        email: verifyAdmin.email,
        role: verifyAdmin.role,
        hasPassword: !!verifyAdmin.password
      });
    } else {
      throw new Error('Admin user verification failed - user not found in database');
    }

  } catch (error) {
    console.error('Error in admin creation process:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Script completed');
    process.exit(0);
  }); 