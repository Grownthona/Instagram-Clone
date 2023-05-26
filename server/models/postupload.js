const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

  caption: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  images: [
    {
      data: Buffer,
      contentType: String
    },
  ]
}, {
    timestamps: true,
  });

module.exports = mongoose.model('Post', postSchema);
