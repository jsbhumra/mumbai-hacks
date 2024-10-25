import { dbConnect } from "@/utils/db";

export async function POST(request) {
  dbConnect();
  const body = await request.json();
  try {
    console.log("Body ", body);
  } catch (error) {}
}
