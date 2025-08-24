const qrCode = require("../models/qrCode");
const QRCode = require("qrcode");

const createQrCodeService = async (userId, { destinationUrl, qrname }) => {
  const imageData = await QRCode.toDataURL(destinationUrl, {
    width: 300,
    margin: 2,
    errorCorrectionLevel: "H",
    type: "image/png",
  });

  const newQrCode = await qrCode.create({
    userId,
    qrname,
    destinationUrl,
    imageData,
  });

  return {
    _id: newQrCode._id,
    userId: newQrCode.userId,
    qrname: newQrCode.qrname,
    destinationUrl: newQrCode.destinationUrl,
    scanCount: newQrCode.scanCount,
    createdAt: newQrCode.createdAt,
    updatedAt: newQrCode.updatedAt,
  };
};

const getAllQrCodesByUserId = async (userId) => {
  const qrDetails = await qrCode.find({ userId }).lean();
  if (!qrDetails) throw new Error("Not found");
  return { qrDetails };
};

module.exports = { createQrCodeService, getAllQrCodesByUserId };
