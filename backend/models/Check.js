const mongoose = require("mongoose");

const checkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
    },

    offerDetails: {
      type: String,
      required: true,
    },

    riskScore: {
      type: Number,
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["Low Risk", "Medium Risk", "High Risk"],
      required: true,
    },

    message: {
      type: String,
    },

    reasons: {
      type: [String],
      default: [],
    },

    positiveSigns: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Check = mongoose.model("Check", checkSchema);

module.exports = Check;