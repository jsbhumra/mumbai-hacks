// utils/refineDataWithGemini.js
import axios from "axios";

export async function refineDataWithGemini(data) {
  try {
    const response = await axios.post("https://api.gemini.com/v1/refineData", data); // Replace with the actual endpoint
    return response.data;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Gemini API call failed");
  }
}
