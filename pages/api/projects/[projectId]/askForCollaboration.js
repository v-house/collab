import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
  const { projectId } = req.query;
  const { userEmail } = req.body; // Assuming the user email ID is provided in the request body

  try {
    const client = await clientPromise;
    const db = client.db("projectcollaborate");

    const project = await db
      .collection("projects")
      .findOne({ _id: ObjectId(projectId) });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // Check if the user is already in the pending, accepted, or rejected list
    if (
      project.i.includes(userEmail) ||
      project.h.includes(userEmail) ||
      project.j.includes(userEmail)
    ) {
      res.status(400).json({ message: "User is already in the project" });
      return;
    }

    // Check if the user is the project manager
    if (project.f === userEmail) {
      res.status(400).json({ message: "User is the project manager" });
      return;
    }

    // Add the user to the pending list
    await db
      .collection("projects")
      .updateOne({ _id: ObjectId(projectId) }, { $push: { i: userEmail } });

    res.status(200).json({ message: "Request for collaboration sent" });
  } catch (error) {
    console.error("Error asking for collaboration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
