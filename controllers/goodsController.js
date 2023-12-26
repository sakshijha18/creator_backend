const express = require('express');
const router = express.Router();
const GoodsModel = require('../models/GoodsModel');

// POST request for goods form
router.post("/forms/goods", async (req, res) => {
  try {
    const {
      purchaseOrderNumber,
      deliveryChallanDetails,
      documentReference,
      receiptType,
      quantity,
      itemDetails,
      numberOfMonthsService,
    } = req.body;

    const goods = new GoodsModel({
      purchaseOrderNumber,
      deliveryChallanDetails,
      documentReference,
      receiptType,
      quantity,
      itemDetails,
      numberOfMonthsService,
    });

    await goods.save();

    res.status(200).json({ message: "Goods created successfully!" });
  } catch (error) {
    console.error("Error submitting Goods:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// To get all the reocrds
router.get('/records/goods', async (req, res) => {
  try {
    const goods = await GoodsModel.find();
    res.json(goods); // Sending JSON response to React client
  } catch (error) {
    console.error('Error fetching user records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// To get a single goods by ID
router.get('/records/goods/:id', async (req, res) => {
  try {
    const goodsId = req.params.id;
    const goods = await GoodsModel.findById(goodsId);

    if (!goods) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(goods);
  } catch (error) {
    console.error('Error fetching user record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
