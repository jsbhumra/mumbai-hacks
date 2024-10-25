// pages/api/refineData.js
import { refineDataWithGemini } from "../../utils/refineDataWithGemini";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const formData = req.body;
    
    try {
      const refinedData = await refineDataWithGemini(formData);
      res.status(200).json(refinedData);
    } catch (error) {
      console.error("Error refining data:", error);
      res.status(500).json({ message: "Data refinement failed", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
