export default async (req, res) => {
  try {
    res.json({
      message: "Protected NextJS Webview Protocol",
    });
  } catch (e) {
    console.error(e);
  }
};
