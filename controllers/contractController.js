const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ContractModel = require('../models/ContractModel');

// POST request for contract form
router.post("/forms/contract", async (req, res) => {
  try {
    const {
      companyName,
      vendorCode,
      address,
      street,
      state,
      pinCode,
      contactPersonName,
      contractStartDate,
      contractEndDate,
      contractType,
      indemnityClauseApplicable,
    } = req.body;

    const contract = new ContractModel({
      companyName,
      vendorCode,
      address,
      street,
      state,
      pinCode,
      contactPersonName,
      contractStartDate,
      contractEndDate,
      contractType,
      indemnityClauseApplicable,
    });

    await contract.save();

    res.status(200).json({ message: "Contract created successfully!" });
  } catch (error) {
    console.error("Error submitting Contract:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all records
router.get('/records/contracts', async (req, res) => {
  try {
    const contract = await ContractModel.find();
    res.json(contract); // Sending JSON response to React client
  } catch (error) {
    console.error('Error fetching user records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// To get a single contract by ID
router.get('/records/contract/:id', async (req, res) => {
  try {
    const contractId = req.params.id;
    const contract = await ContractModel.findById(contractId);

    if (!contract) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(contract);
  } catch (error) {
    console.error('Error fetching user record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
