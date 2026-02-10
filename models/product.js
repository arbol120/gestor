const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Product', ProductSchema);
