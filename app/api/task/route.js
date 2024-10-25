import { dbConnect } from "@/utils/dbConnect";

export async function POST(request) {
  dbConnect();
  const body = await request.json();
}
