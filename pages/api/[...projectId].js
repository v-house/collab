import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { projectId } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("projectcollaborate");

    const project = await db
      .collection("projects")
      .findOne({ _id: String(projectId[0]) });
    console.log(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
