const homeHandler = (req, res) => {
  res.json({ message: "✅ Server is running!" });
};

module.exports = homeHandler;
