const mongoose = require("mongoose");
const User = require("./user");
const { Schema } = mongoose;

const qrcodeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
      index: true,
    },
    qrname: {
      type: String,
      required: true,
      required: [true, "QR code name is required"],
      trim: true,
      maxlength: [50, "Name cannot be longer than 50 characters"],
    },
    imageData: { type: String, required: true },
    destinationUrl: {
      type: String,
      required: true,
      required: [true, "Destination URL is required"],
      trim: true,
    },
    scanCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.imageData;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("QrCode", qrcodeSchema);
