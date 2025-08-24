const { createQrCode, getUserQrCodes } = require("../controllers/qrCodeController");
const authenticate = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

router.use(authenticate);

router.post("/", createQrCode);
router.get("/", getUserQrCodes)

module.exports = router;
