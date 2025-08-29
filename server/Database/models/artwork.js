const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema({
  artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan', required: true },
  images: {
    type: [{
      url: String,
      public_id: String,
      title: String,
      description: String
    }]
    , required: true
  }
})

const Artwork = mongoose.model('Artwork', artworkSchema)

module.exports = Artwork