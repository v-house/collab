// api/projects/[projectId]/acceptUser.js

import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userId = session.user.id;
  const projectId = req.query.projectId;

  try {
    const { db } = await connectToDatabase();
    const project = await db
      .collection("projects")
      .findOne({ _id: ObjectId(projectId) });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    if (project.f !== userId) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    const { userId: acceptUserId } = req.body;

    if (!acceptUserId) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    await db
      .collection("projects")
      .updateOne(
        { _id: ObjectId(projectId) },
        { $pull: { i: acceptUserId }, $addToSet: { h: acceptUserId } }
      );

    res.status(200).json({ message: "User accepted successfully" });
  } catch (error) {
    console.error("Error accepting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
