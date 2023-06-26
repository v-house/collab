export default async function handler(req, res) {
  return res.status(420).json({ message: "Method Not Allowed" });
}
