const ServerCheck = (req, res) => {
  res.json({ message: "✅ Server is running!" });
};

module.exports = ServerCheck;
