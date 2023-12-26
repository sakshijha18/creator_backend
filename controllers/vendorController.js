const express = require("express");
const router = express.Router();
const multer = require("multer");
const VendorModel = require("../models/VendorModel");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST request for vendor form
router.post("/forms/vendor", upload.fields([
  { name: "panFile", maxCount: 1 },
  { name: "gstFile", maxCount: 1 },
  { name: "vatFile", maxCount: 1 },
  { name: "tinFile", maxCount: 1 },
  { name: "salesTaxFile", maxCount: 1 },
  { name: "msmeCertFile", maxCount: 1 },
  { name: "aoaFile", maxCount: 1 },
  { name: "moaFile", maxCount: 1 },
  { name: "cancelledChequeFile", maxCount: 1 },
]), async (req, res) => {
  try {
    const {
      companyName,
      address,
      state,
      contactPerson,
      mobileNumber,
      supplierType,
      billSubmissionFrequency,
      gstInputCredit,
      tdsApplicabilityType,
      taxRegistrationNumber,
      companyRegistrationNumber,
      bankAccountNumber,
      ifscCode,
      branchName,
      registeredInSME,
      hasLowerTDSCertificate,
      status,
    } = req.body;
    const files = req.files;

    const vendor = new VendorModel({
      companyName,
      address,
      state,
      contactPerson,
      mobileNumber,
      supplierType,
      billSubmissionFrequency,
      gstInputCredit,
      tdsApplicabilityType,
      taxRegistrationNumber,
      companyRegistrationNumber,
      bankAccountNumber,
      ifscCode,
      branchName,
      registeredInSME,
      hasLowerTDSCertificate,

      panFile: {
        data: req.files["panFile"][0].buffer,
        contentType: req.files["panFile"][0].mimetype,
        fileName: req.files["panFile"][0].originalname,
      },
      gstFile: {
        data: req.files["gstFile"][0].buffer,
        contentType: req.files["gstFile"][0].mimetype,
        fileName: req.files["gstFile"][0].originalname,
      },
      vatFile: {
        data: req.files["vatFile"][0].buffer,
        contentType: req.files["vatFile"][0].mimetype,
        fileName: req.files["vatFile"][0].originalname,
      },
      tinFile: {
        data: req.files["tinFile"][0].buffer,
        contentType: req.files["tinFile"][0].mimetype,
        fileName: req.files["tinFile"][0].originalname,
      },
      salesTaxFile: {
        data: req.files["salesTaxFile"][0].buffer,
        contentType: req.files["salesTaxFile"][0].mimetype,
        fileName: req.files["salesTaxFile"][0].originalname,
      },
      msmeCertFile: {
        data: req.files["msmeCertFile"][0].buffer,
        contentType: req.files["msmeCertFile"][0].mimetype,
        fileName: req.files["msmeCertFile"][0].originalname,
      },
      aoaFile: {
        data: req.files["aoaFile"][0].buffer,
        contentType: req.files["aoaFile"][0].mimetype,
        fileName: req.files["aoaFile"][0].originalname,
      },
      moaFile: {
        data: req.files["moaFile"][0].buffer,
        contentType: req.files["moaFile"][0].mimetype,
        fileName: req.files["moaFile"][0].originalname,
      },
      cancelledChequeFile: {
        data: req.files["cancelledChequeFile"][0].buffer,
        contentType: req.files["cancelledChequeFile"][0].mimetype,
        fileName: req.files["cancelledChequeFile"][0].originalname,
      },

      status,
    });

    await vendor.save();

    res.status(200).json({ message: "Vendor created successfully!" });
  } catch (error) {
    console.error("Error submitting Vendor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// To get all vendors
router.get("/records/vendors", async (req, res) => {
  try {
    const vendors = await VendorModel.find();
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching user records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// To get a single mail by ID
router.get('/records/vendors/:id', async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await VendorModel.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(vendor);
  } catch (error) {
    console.error('Error fetching user record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
