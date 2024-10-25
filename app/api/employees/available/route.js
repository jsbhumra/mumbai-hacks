import User from "@/models/user";
import { dbConnect } from "@/utils/db";


export async function GET(request) {

    dbConnect();
      try {
        const res =  await User.find({ type: 'employee', availability: 'available' })
        return Response.json(res);
      } catch (error) {
        return Response.json({ error: error.message });
      }
  }