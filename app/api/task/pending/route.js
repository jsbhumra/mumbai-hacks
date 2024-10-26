import { Task } from "@/models/task";
import { dbConnect } from "@/utils/db";

export async function GET(request) {
  dbConnect();
  try {
    const res = await Task.find({ status: "PENDING" });
    // console.log(res)
    return Response.json(res);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
