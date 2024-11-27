const mongoose = require('mongoose');

// Define the schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Register and export the model
module.exports = mongoose.model('Post', postSchema);
