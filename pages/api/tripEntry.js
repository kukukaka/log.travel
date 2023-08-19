// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async (req, res) => {
//   if (req.method === 'POST') {
//     const data = req.body;

//     try {
//       const entry = await prisma.tripEntry.create({
//         data,
//       });
//       res.status(200).json(entry);
//     } catch (error) {
//       console.error('Error adding trip entry:', error);
//       res.status(500).json({ error: 'Failed to add the entry.' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed.' });
//   }
// };