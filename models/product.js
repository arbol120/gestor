const Product = require('../models/product');

exports.create = async (req, res) => {
  try {
    const { name, price } = req.body;
    // req.user.id viene del middleware de JWT que ya tienes
    const newProduct = new Product({ 
      name, 
      price, 
      userId: req.user.id 
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear producto" });
  }
};