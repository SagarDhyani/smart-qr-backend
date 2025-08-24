const { createQrCodeService } = require("../services/qrCodeService");

const createQrCode = async (req, res) => {
  const { destinationUrl, qrname } = req.body;
  const userId = req.user._id;

  const newQr = await createQrCodeService(userId, {
    destinationUrl,
    qrname,
  });

  res.status(201).json({
    message: `New Qr code with name ${newQr.qrname} created for ${newQr.destinationUrl}`,
  });
};

module.exports = {
  createQrCode,
};
