require('mongoose-type-url');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    minlength: 2,
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url,
    type: String,
    required: true,
  },
  trailerLink: {
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url,
    type: String,
    required: true,
  },
  thumbnail: {
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url,
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
