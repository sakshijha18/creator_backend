const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  contactPerson: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  supplierType: { type: String, required: true },
  billSubmissionFrequency: { type: String, required: true },
  gstInputCredit: { type: String, required: true },
  tdsApplicabilityType: { type: String, required: true },
  taxRegistrationNumber: { type: String, required: true },
  companyRegistrationNumber: { type: String, required: true },
  bankAccountNumber: { type: Number, required: true },
  ifscCode: { type: String, required: true },
  branchName: { type: String, required: true },
  registeredInSME: { type: String, required: true },
  hasLowerTDSCertificate: { type: String, required: true },

  panFile: { data: Buffer, contentType: String, fileName: String },
  gstFile: { data: Buffer, contentType: String, fileName: String },
  vatFile: { data: Buffer, contentType: String, fileName: String },
  tinFile: { data: Buffer, contentType: String, fileName: String },
  salesTaxFile: { data: Buffer, contentType: String, fileName: String },
  msmeCertFile: { data: Buffer, contentType: String, fileName: String },
  aoaFile: { data: Buffer, contentType: String, fileName: String },
  moaFile: { data: Buffer, contentType: String, fileName: String },
  cancelledChequeFile: { data: Buffer, contentType: String, fileName: String },
  status: { type: String, required: true },
});

const VendorModel = mongoose.model("Vendor", VendorSchema);
// console.log("Vendor created successfully");

module.exports = VendorModel;
