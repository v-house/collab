import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { projectId } = req.query;

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

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
