import { dbConnect } from "@/utils/db"; // Ensure you have a dbConnect utility
import User from "@/models/user"; // Adjust the path based on your directory structure
import Task from "@/models/task"; // Adjust the path based on your directory structure

export async function GET(request, { params }) {
  // Await the database connection
  await dbConnect();
  const { id } = await params; // Extract the id from params

  try {
    // Fetch the user by id and populate the currentTask
    const user = await User.findById(id)

    // Check if the user exists
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }


    // Return the current task
    return new Response(JSON.stringify(user.fname+' '+user.lname), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
