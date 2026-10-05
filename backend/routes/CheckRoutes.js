const express = require("express");
const Check = require("../models/Check");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      company,
      role,
      website,
      email,
      offerDetails,
    } = req.body;

    // Required field
    if (!userId || !company || !role || !offerDetails) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    let riskScore = 0;
    let reasons = [];
    let positiveSigns = [];

    // Payment / fee check
    if (
      /registration fee|joining fee|security fee|payment|pay|₹|rs\.?|rupees/i.test(
        offerDetails
      )
    ) {
      riskScore += 30;

      reasons.push(
        "The internship appears to ask for payment or a fee."
      );
    }

    // Sensitive information check
    if (
      /otp|password|bank account|bank details|upi|card details/i.test(
        offerDetails
      )
    ) {
      riskScore += 30;

      reasons.push(
        "The offer asks for sensitive personal or financial information."
      );
    }

    // Website check
    if (!website) {
      riskScore += 20;

      reasons.push(
        "No company or internship website was provided."
      );
    }

    // Free email check
    if (
      email &&
      /(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/i.test(email)
    ) {
      riskScore += 20;

      reasons.push(
        "The contact email uses a free email provider instead of a company domain."
      );
    }

    // WhatsApp / Telegram check
    if (/whatsapp|telegram/i.test(offerDetails)) {
      riskScore += 10;

      reasons.push(
        "The internship primarily mentions WhatsApp or Telegram communication."
      );
    }

    // Unrealistic guarantee check
    if (
      /guaranteed job|100% job|guaranteed placement/i.test(
        offerDetails
      )
    ) {
      riskScore += 20;

      reasons.push(
        "The offer makes an unrealistic job or placement guarantee."
      );
    }

    // Positive signs
    if (website && website.startsWith("https://")) {
      positiveSigns.push(
        "Company website uses HTTPS."
      );
    }

    if (
      email &&
      !/(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/i.test(
        email
      )
    ) {
      positiveSigns.push(
        "Contact email uses a company domain."
      );
    }

    if (company && role && offerDetails) {
      positiveSigns.push(
        "Basic internship details are provided."
      );
    }

    // Maximum score = 100
    riskScore = Math.min(riskScore, 100);

    // Risk level
    let riskLevel;
    let message;

    if (riskScore >= 50) {
      riskLevel = "High Risk";

      message =
        "Several warning signs were found in this internship offer.";
    } else if (riskScore >= 20) {
      riskLevel = "Medium Risk";

      message =
        "This internship needs some verification before you proceed.";
    } else {
      riskLevel = "Low Risk";

      message =
        "No major warning signs were detected from the information provided.";
    }

    // Save check in MongoDB
    const check = await Check.create({
      user: userId,
      company,
      role,
      website,
      email,
      offerDetails,
      riskScore,
      riskLevel,
      message,
      reasons,
      positiveSigns,
    });

    // Send result to frontend
    res.status(201).json({
      message: "Internship checked successfully",
      result: {
        id: check._id,
        company: check.company,
        role: check.role,
        riskScore: check.riskScore,
        level: check.riskLevel,
        message: check.message,
        reasons: check.reasons,
        positiveSigns: check.positiveSigns,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Dashboard statistics
router.get("/stats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const checks = await Check.find({
      user: userId,
    });

    const totalChecks = checks.length;

    const highRisk = checks.filter(
      (check) => check.riskLevel === "High Risk"
    ).length;

    const mediumRisk = checks.filter(
      (check) => check.riskLevel === "Medium Risk"
    ).length;

    const lowRisk = checks.filter(
      (check) => check.riskLevel === "Low Risk"
    ).length;

    res.status(200).json({
      totalChecks,
      highRisk,
      mediumRisk,
      lowRisk,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch dashboard statistics",
    });
  }
});

// Get all internship checks of a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const checks = await Check.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      checks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch history",
    });
  }
});

// DELETE A HISTORY CHECK
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCheck = await Check.findByIdAndDelete(id);

    if (!deletedCheck) {
      return res.status(404).json({
        message: "History check not found",
      });
    }

    res.status(200).json({
      message: "History check deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;