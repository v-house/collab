export default async (req, res) => {
  try {
    res.status(420).json({
      message: "Protected NextJS Webview Protocol",
    });
  } catch (e) {
    console.error(e);
  }
};
