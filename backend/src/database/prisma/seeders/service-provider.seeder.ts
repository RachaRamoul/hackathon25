import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export async function seedServiceProviders(prisma: PrismaClient) {
  const hashedPassword = await bcrypt.hash('azerty123', 10);

  const serviceProviders = [
    {
      firstName: 'Hema',
      lastName: 'Birabourame',
      email: 'hema@gmail.com',
      password: hashedPassword,
    },
    {
      firstName: 'Racha',
      lastName: 'Ramoul',
      email: 'racha@gmail.com',
      password: hashedPassword,
    },
    {
      firstName: 'Sarah',
      lastName: 'Salamani',
      email: 'sarah@gmail.com',
      password: hashedPassword,
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'John@gmail.com',
      password: hashedPassword,
    },
    {
      firstName: 'Nour',
      lastName: 'Kacem',
      email: 'nour.kacem@gmail.com',
      password: hashedPassword,
    },
    {
      firstName: 'Lucas',
      lastName: 'Morel',
      email: 'lucas.morel@gmail.com',
      password: hashedPassword,
    },
    {
      firstName: 'Aïcha',
      lastName: 'Benali',
      email: 'aicha.benali@gmail.com',
      password: hashedPassword,
    },
  ];

  for (const serviceProvider of serviceProviders) {
    await prisma.serviceProvider.upsert({
      where: { email: serviceProvider.email },
      update: {},
      create: serviceProvider,
    });
  }

  console.log('prestataires créés avec succès !');
}
