const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({

    companyName: { type: String, required: true },
    documentReference: { type: String, required: true },
    documentType: { type: String, required: true },
    documentCurrency: { type: String, required: true },
    poNumber: { type: String, required: true },
    instructions: { type: String, required: true },
    
    attachment1: { data: Buffer, contentType: String, fileName: String },
    attachment2: { data: Buffer, contentType: String, fileName: String },
    attachment3: { data: Buffer, contentType: String, fileName: String },
    attachment4: { data: Buffer, contentType: String, fileName: String },
    attachment5: { data: Buffer, contentType: String, fileName: String },
    attachment6: { data: Buffer, contentType: String, fileName: String },
    status: { type: String, required: true }
});

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);
// console.log('Invoice created successfully');

module.exports = InvoiceModel;