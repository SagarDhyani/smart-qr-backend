const {
  createQrCodeService,
  getAllQrCodesByUserId,
} = require("../services/qrCodeService");

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

const getUserQrCodes = async (req, res) => {
  const { userId } = req.query;

  if (!userId) throw new Error("Please provide a valid userId");

  const { qrDetails } = await getAllQrCodesByUserId(userId);

  res.status(200).json({
    success: true,
    data: {
      qrDetails,
    },
    message: "Qr Codes retrived successfully",
  });
};

module.exports = {
  createQrCode,
  getUserQrCodes,
};
