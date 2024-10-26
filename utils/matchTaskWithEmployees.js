import axios from "axios";

const prompt = `
        You are an AI task assignment expert. Analyze the given task and available employees to suggest the best matches.
        
        Task Details:
        ${task}

        Available Employees:
        ${employees
          .map(
            (emp) => `
            ID: ${emp._id}
            Name: ${emp.name}
            Skills: ${JSON.stringify(emp.skills)}
            Current Tasks: ${emp.currentTasks || 0}
            Past Performance Score: ${
              emp.completionMetrics?.averageQualityScore || "N/A"
            }
        `
          )
          .join("\n")}

        Please analyze and return a JSON object with:
        1. Top 3 best-matched employees
        2. Score for each match (0-100)
        3. Reasoning for each match
        4. Any potential risks or concerns

        Format the response strictly as a JSON object without any additional text.
        `;

try {
  const result = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
    {
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "Generate 3 reasons and their solutions based on the title and description fields below. Treat the whole object as a task in a software development company workflow.. Give reasons output as array of objects and each object has key = reason and value as the solution: " +
                JSON.stringify(data),
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 1,
        topK: 64,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.data.candidates[0].content.parts[0].text;
} catch (e) {
  console.log(e);
}
