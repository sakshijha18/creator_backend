const mongoose = require("mongoose");
let GoodsModel;

try {
  GoodsModel = mongoose.model("Goods");
} catch (e) {
  const goodsSchema = new mongoose.Schema({
    
    recordOwnerId: { type: String, required: true },
    recordOwnerName: { type: String, required: true },
    purchaseOrderNumber: { type: String, required: true },
    deliveryChallanDetails: { type: String, required: true },
    documentReference: { type: String, required: true },
    receiptType: { type: String, required: true },
    quantity: { type: String, required: true },
    itemDetails: { type: String, required: true },
    numberOfMonthsService: { type: Number, required: true },
  });

  GoodsModel = mongoose.model("Goods", goodsSchema);
}

// console.log("Goods Receipt created successfully");

module.exports = GoodsModel;
