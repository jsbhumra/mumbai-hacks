import { dbConnect } from "@/utils/db";
const { Task, BugTask, FeatureTask } = require("@/models/task");

export async function POST(request) {
  dbConnect();
  const body = await request.json();
  console.log(body)
  const { title, description, priority, deadline, createdBy, tags, activeTab, stepsToReproduce, expectedBehavior, actualBehavior, expectedOutcome } = body;

  try {
    // Common fields for both bug and feature
    const baseData = {
      title,
      description,
      priority,
      deadline,
      // createdBy,
      tags,
      taskType: activeTab,
    };

    let task;

    // Create either a BugTask or FeatureTask based on taskType
    if (activeTab === "BUG") {
      task = new BugTask({
        ...baseData,
        stepsToReproduce,
        expectedBehavior,
        actualBehavior,
      });
    } else if (activeTab === "FEATURE") {
      task = new FeatureTask({
        ...baseData,
        expectedOutcome,
      });
    } else {
      console.log('err')
      return Response.json({ error: "Invalid task type" });
    }

    // Save the task to the database
    await task.save();
    return Response.json({ message: "Task created successfully", task });
  } catch (error) {
    console.log(error)
  }
}
