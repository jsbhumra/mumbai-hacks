import { dbConnect } from "@/utils/db";
const { Task } = require("@/models/task");

export async function POST(request) {
  await dbConnect(); // Ensure the database connection is established

  const { taskId, memberId } = await request.json();

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        assignedTo: memberId,
        status: "IN_PROGRESS",
      },
      { new: true }
    );

    if (!updatedTask) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }, // Add header for JSON response
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      memberId,
      { availability: "assigned", currentTask: taskId },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }, // Add header for JSON response
      });
    }

    return new Response(
      JSON.stringify({ message: "Task assigned successfully", updatedTask }),
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
