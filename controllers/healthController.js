exports.healthCheck = (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "kasun-portfolio-backend",
    timestamp: new Date().toISOString()
  });
};
