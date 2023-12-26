const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  permissions: {
    contractApprover: {
      type: Boolean,
      default: false,
    },
    invoiceCreator: {
      type: Boolean,
      default: false,
    },
    invoiceApprover: {
      type: Boolean,
      default: false,
    },
    vendorApprover: {
      type: Boolean,
      default: false,
    },
    vendorCreator: {
      type: Boolean,
      default: false,
    },
    goodsReceiptCreator: {
      type: Boolean,
      default: false,
    },
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
