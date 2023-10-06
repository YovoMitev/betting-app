import { PrismaClient } from '@prisma/client';

const data = [
  { name: 'Red Dragons vs Lone Wolfs', odds: 1.86 },
  { name: 'Blue Lightning vs Beards', odds: 2.51 },
  { name: 'Green Eagles vs Night Watchers', odds: 3.14 },
  { name: 'Golden Lions vs Elder Nights', odds: 1.44 },
  { name: 'Silver Tigers vs Clever Minds', odds: 1.61 },
];

async function seed() {
  const prisma = new PrismaClient();

  try {
    const promises = data.map((entity) =>
      prisma.event.create({
        data: entity,
      })
    );

    await Promise.all(promises);
    console.log('Team seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding team data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
