import { Task } from "@/models/task";
import User from "@/models/user";
import { dbConnect } from "@/utils/db";


export async function POST(request) {
  await dbConnect(); // Ensure the database connection is established

  const { userId, taskId } = await request.json();

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        assignedTo: userId,
        status: "COMPLETED",
      },
      { new: true }
    );

    if (!updatedTask) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }, // Add header for JSON response
      });
    }
    console.log(userId)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { availability: "available", currentTask: null },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }, // Add header for JSON response
      });
    }

    return new Response(
      JSON.stringify({ message: "Task completed successfully", updatedTask }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }, // Add header for JSON response
      }
    );
  } catch (error) {
    console.error("Error assigning task:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }, // Add header for JSON response
      }
    );
  }
}
