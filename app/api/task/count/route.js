// pages/api/tasks/count.js
import mongoose from 'mongoose';
import { Task } from '@/models/task'; // Adjust the path if necessary
import { dbConnect } from '@/utils/db';

export async function GET(request) {
  // Only allow GET requests
  // if (req.method !== 'GET') {
  //   return res.status(405).json({ message: 'Method not allowed' });
  // }

  try {
    dbConnect();
    const count = await Task.countDocuments();
    console.log(count)
    return Response.json({ count });
  } catch (error) {
    console.error("Error counting tasks:", error);
  }
}
