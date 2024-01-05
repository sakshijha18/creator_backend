const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema({
    
  recordOwnerId: { type: String, required: true },
  recordOwnerName: { type: String, required: true },
  consignmentNumber: { type: String, required: true },
  companyName: { type: String, required: true },
  documentReference: { type: String, required: true },
  documentType: { type: String, required: true },
  documentCurrency: { type: String, required: true },
  poNumber: { type: String, required: true },

  attachment1: { data: Buffer, contentType: String, fileName: String },
  attachment2: { data: Buffer, contentType: String, fileName: String },
  attachment3: { data: Buffer, contentType: String, fileName: String },
  attachment4: { data: Buffer, contentType: String, fileName: String },
  attachment5: { data: Buffer, contentType: String, fileName: String },
  attachment6: { data: Buffer, contentType: String, fileName: String },
  status: { type: String, required: true },
});

const MailModel = mongoose.model("Mail", MailSchema);

// console.log('Mail created successfully');

module.exports = MailModel;
