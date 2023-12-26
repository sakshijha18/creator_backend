const express = require('express');
const router = express.Router();
const multer = require('multer');
const InvoiceModel = require('../models/InvoiceModel');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// POST request for invoice form
router.post("/forms/invoice", upload.fields([
  { name: "attachment1", maxCount: 1 },
  { name: "attachment2", maxCount: 1 },
  { name: "attachment3", maxCount: 1 },
  { name: "attachment4", maxCount: 1 },
  { name: "attachment5", maxCount: 1 },
  { name: "attachment6", maxCount: 1 },
]), async (req, res) => {
  try {
    const {
      consignmentNumber,
      companyName,
      documentReference,
      documentType,
      documentCurrency,
      poNumber,
      instructions,
      status,
    } = req.body;
    const files = req.files;

    const invoice = new InvoiceModel({
      consignmentNumber,
      companyName,
      documentReference,
      documentType,
      documentCurrency,
      poNumber,
      instructions,

      attachment1: {
        data: req.files["attachment1"][0].buffer,
        contentType: req.files["attachment1"][0].mimetype,
        fileName: req.files["attachment1"][0].originalname,
      },
      attachment2: {
        data: req.files["attachment2"][0].buffer,
        contentType: req.files["attachment2"][0].mimetype,
        fileName: req.files["attachment2"][0].originalname,
      },
      attachment3: {
        data: req.files["attachment3"][0].buffer,
        contentType: req.files["attachment3"][0].mimetype,
        fileName: req.files["attachment3"][0].originalname,
      },
      attachment4: {
        data: req.files["attachment4"][0].buffer,
        contentType: req.files["attachment4"][0].mimetype,
        fileName: req.files["attachment4"][0].originalname,
      },
      attachment5: {
        data: req.files["attachment5"][0].buffer,
        contentType: req.files["attachment5"][0].mimetype,
        fileName: req.files["attachment5"][0].originalname,
      },
      attachment6: {
        data: req.files["attachment6"][0].buffer,
        contentType: req.files["attachment6"][0].mimetype,
        fileName: req.files["attachment6"][0].originalname,
      },

      status,
    });

    await invoice.save();

    res.status(200).json({ message: "Invoice created successfully!" });
  } catch (error) {
    console.error("Error submitting Invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// To get all invoices
router.get('/records/invoices', async (req, res) => {
  try {
    const invoice = await InvoiceModel.find();
    res.json(invoice); // Sending JSON response to React client
  } catch (error) {
    console.error('Error fetching user records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// To get a single invoice by ID
router.get('/records/invoices/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await InvoiceModel.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(invoice);
  } catch (error) {
    console.error('Error fetching user record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Exporting the router
module.exports = router;
