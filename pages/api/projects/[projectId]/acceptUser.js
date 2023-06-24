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

    // Check if the user is in the pending list
    if (!project.i.includes(userEmail)) {
      res.status(400).json({ message: "User is not in the pending list" });
      return;
    }

    // Remove the user from the pending list and add to the accepted list
    await db.collection("projects").updateOne(
      { _id: ObjectId(projectId) },
      {
        $pull: { i: userEmail },
        $addToSet: { h: userEmail },
      }
    );

    res.status(200).json({ message: "User accepted" });
  } catch (error) {
    console.error("Error accepting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
