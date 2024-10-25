import axios from "axios";

// Function to generate AI content using the Gemini API
async function generateAIContent(title, description) {
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
                  "Generate 3 reasons and their solutions based on the title and description fields below. Treat the whole object as a task in a software development company workflow: " +
                  JSON.stringify({ title, description }),
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

    // Parse the AI content
    return JSON.parse(result.data.candidates[0].content.parts[0].text);
  } catch (error) {
    // Log the error response
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error("Failed to generate AI content");
    } else {
      console.error("Error:", error.message);
      throw new Error("Failed to generate AI content");
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { title, description } = req.body;

  try {
    // Call the generateAIContent function with title and description
    const aiContent = await generateAIContent(title, description);
    
    // Send the AI generated content as response
    res.status(200).json(aiContent.reasons);
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    res.status(500).json({ message: "Failed to fetch suggestions" });
  }
}


// Helper function to parse AI content into structured format
function parseAiContent(aiContent) {
  // Example parsing logic (adapt as necessary based on the expected output format)
  const pattern = /Reason: (.+?)\. Solution: (.+?)(?=\. Reason:|$)/g;
  const issuesAndSolutions = [];
  let match;

  while ((match = pattern.exec(aiContent)) !== null) {
    issuesAndSolutions.push({
      reason: match[1].trim(),
      solution: match[2].trim(),
    });
  }

  return issuesAndSolutions;
}
