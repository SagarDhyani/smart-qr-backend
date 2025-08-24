const { createQrCode } = require("../controllers/qrCodeController");
const authenticate = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

router.use(authenticate);

router.post("/", createQrCode);

module.exports = router;
