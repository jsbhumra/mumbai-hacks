// utils/generateGeminiReport.js
import axios from "axios";

export async function generateGeminiReport(task) {
  try {
    const response = await axios.post("https://api.gemini.com/v1/report/generate", {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      deadline: task.deadline,
      createdBy: task.createdBy,
      assignedTo: task.assignedTo,
      tags: task.tags,
      taskType: task.taskType,
      // Add bug-specific fields if taskType is BUG
      ...(task.taskType === "BUG" && {
        stepsToReproduce: task.stepsToReproduce,
        expectedBehavior: task.expectedBehavior,
        actualBehavior: task.actualBehavior,
      }),
      // Add feature-specific fields if taskType is FEATURE
      ...(task.taskType === "FEATURE" && {
        expectedOutcome: task.expectedOutcome,
      }),
    });

    return response.data; // Return response from Gemini API
  } catch (error) {
    console.error("Failed to generate report:", error);
    throw new Error("Report generation failed.");
  }
}
