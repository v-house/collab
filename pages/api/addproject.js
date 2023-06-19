import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const projectData = req.body;
  console.log(projectData);

  try {
    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db("projectcollaborate");

    // Insert the project document into the collection
    const result = await db.collection("projects").insertOne(projectData);

    res.status(201).json({ message: "Project created successfully", result });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
