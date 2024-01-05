const express = require("express");
const router = express.Router();
const multer = require("multer");
const VendorModel = require("../models/VendorModel");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST request for vendor form
router.post(
  "/forms/vendor",
  upload.fields([
    { name: "panFile", maxCount: 1 },
    { name: "gstFile", maxCount: 1 },
    { name: "vatFile", maxCount: 1 },
    { name: "tinFile", maxCount: 1 },
    { name: "salesTaxFile", maxCount: 1 },
    { name: "msmeCertFile", maxCount: 1 },
    { name: "aoaFile", maxCount: 1 },
    { name: "moaFile", maxCount: 1 },
    { name: "cancelledChequeFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        recordOwnerId,
        recordOwnerName,
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

      const panFileData = req.files["panFile"];
      const panFile = panFileData
        ? {
            data: panFileData[0].buffer,
            contentType: panFileData[0].mimetype,
            fileName: panFileData[0].originalname,
          }
        : undefined;

        const gstFileData = req.files["gstFile"];
      const gstFile = gstFileData
        ? {
            data: gstFileData[0].buffer,
            contentType: gstFileData[0].mimetype,
            fileName: gstFileData[0].originalname,
          }
        : undefined;

        const vatFileData = req.files["vatFile"];
      const vatFile = vatFileData
        ? {
            data: vatFileData[0].buffer,
            contentType: vatFileData[0].mimetype,
            fileName: vatFileData[0].originalname,
          }
        : undefined;

        const tinFileData = req.files["tinFile"];
      const tinFile = tinFileData
        ? {
            data: tinFileData[0].buffer,
            contentType: tinFileData[0].mimetype,
            fileName: tinFileData[0].originalname,
          }
        : undefined;

        const salesTaxFileData = req.files["salesTaxFile"];
      const salesTaxFile = salesTaxFileData
        ? {
            data: salesTaxFileData[0].buffer,
            contentType: salesTaxFileData[0].mimetype,
            fileName: salesTaxFileData[0].originalname,
          }
        : undefined;

        const msmeCertFileData = req.files["msmeCertFile"];
      const msmeCertFile = panFileData
        ? {
            data: msmeCertFileData[0].buffer,
            contentType: msmeCertFileData[0].mimetype,
            fileName: msmeCertFileData[0].originalname,
          }
        : undefined;

        const aoaFileData = req.files["aoaFile"];
      const aoaFile = aoaFileData
        ? {
            data: aoaFileData[0].buffer,
            contentType: aoaFileData[0].mimetype,
            fileName: aoaFileData[0].originalname,
          }
        : undefined;

        const moaFileData = req.files["moaFile"];
      const moaFile = moaFileData
        ? {
            data: moaFileData[0].buffer,
            contentType: moaFileData[0].mimetype,
            fileName: moaFileData[0].originalname,
          }
        : undefined;

        const cancelledChequeFileData = req.files["cancelledChequeFile"];
      const cancelledChequeFile = panFileData
        ? {
            data: cancelledChequeFileData[0].buffer,
            contentType: cancelledChequeFileData[0].mimetype,
            fileName: cancelledChequeFileData[0].originalname,
          }
        : undefined;

      const vendor = new VendorModel({
        recordOwnerId,
        recordOwnerName,
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

        panFile: panFile,
        gstFile: gstFile,
        vatFile: vatFile,
        tinFile: tinFile,
        salesTaxFile: salesTaxFile,
        msmeCertFile: msmeCertFile,
        aoaFile: aoaFile,
        moaFile: moaFile,
        cancelledChequeFile: cancelledChequeFile,

        status,
      });

      await vendor.save();

      res.status(200).json({ message: "Vendor created successfully!" });
    } catch (error) {
      console.error("Error submitting Vendor:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
);

// To get all vendors and to get the searched results
router.get('/records/vendors', async (req, res) => {
  try {
  const searchKeyword = req.query.keyword;
  
  let vendors;
  if (searchKeyword) {
  const isObjectId = mongoose.Types.ObjectId.isValid(searchKeyword);
  
  if (isObjectId) {
  vendors = await VendorModel.find({
  _id: searchKeyword,
  });
  } else {
  const regex = new RegExp(searchKeyword, 'i');
  vendors = await VendorModel.find({
  $or: [
  { companyName: regex },
  { contactPerson: regex },
  { address: regex },
  { state: regex },
  { mobileNumber: regex },
  { taxRegistrationNumber: regex },
  { companyRegistrationNumber: regex },
  { bankAccountNumber: regex },
  { ifscCode: regex },
  { branchName: regex },
  ],
  }).collation({ locale: 'en', strength: 2 });
  }
  } else {
  vendors = await VendorModel.find();
  }
  
  res.json(vendors);
  } catch (error) {
  console.error('Error fetching vendors records:', error);
  res.status(500).json({ error: 'Internal server error' });
  }
  });
    

// To get a single mail by ID
router.get("/records/vendors/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await VendorModel.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(vendor);
  } catch (error) {
    console.error("Error fetching user record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
