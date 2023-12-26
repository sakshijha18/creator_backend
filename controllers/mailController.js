const express = require('express');
const router = express.Router();
const multer = require('multer');
const MailModel = require('../models/MailModel');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST request for mail form
router.post("/forms/mail", upload.fields([
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
      status,
    } = req.body;
    const files = req.files;

    const mail = new MailModel({
      consignmentNumber,
      companyName,
      documentReference,
      documentType,
      documentCurrency,
      poNumber,

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

    await mail.save();

    res.status(200).json({ message: "Mail created successfully!" });
  } catch (error) {
    console.error("Error submitting Mail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// To get all the mails
router.get('/records/mails', async (req, res) => {
  try {
    const mail = await MailModel.find();
    res.json(mail); 
  } catch (error) {
    console.error('Error fetching user records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// To get a single mail by ID
router.get('/records/mails/:id', async (req, res) => {
  try {
    const mailId = req.params.id;
    const mail = await MailModel.findById(mailId);

    if (!mail) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(mail);
  } catch (error) {
    console.error('Error fetching user record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// To get a single mail by ID and handle attachments
router.get('/records/mails/:id/:attachment', async (req, res) => {
  try {
    const mailId = req.params.id;
    const attachment = req.params.attachment;
    const mail = await MailModel.findById(mailId);

    if (!mail || !mail[attachment]) {
      return res.status(404).json({ error: 'Mail or attachment not found' });
    }

    res.json(mail[attachment]);
  } catch (error) {
    console.error('Error fetching mail record or attachment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Exporting the router
module.exports = router;
