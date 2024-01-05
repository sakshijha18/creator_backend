const mongoose = require("mongoose");
let ContractModel;

try {
  ContractModel = mongoose.model("Contract");
} catch (e) {
  const contractSchema = new mongoose.Schema({
    
    recordOwnerId: { type: String, required: true },
    recordOwnerName: { type: String, required: true },
    companyName: { type: String, required: true },
    vendorCode: { type: String, required: true },
    address: { type: String, required: true },
    street: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    contactPersonName: { type: String, required: true },
    contractStartDate: { type: Date, required: true },
    contractEndDate: { type: Date, required: true },
    contractType: { type: String, required: true },
    indemnityClauseApplicable: { type: String, required: true },
  });

  ContractModel = mongoose.model("Contract", contractSchema);
}

// console.log("Contract created successfully");
module.exports = ContractModel;
