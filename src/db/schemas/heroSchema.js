const { Schema, model, SchemaTypes } = require('mongoose');

const heroSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Set name for hero'],
      unique: true,
    },
    real_name: {
      type: String,
      required: [true, 'Set real name for hero'],
    },
    origin_description: {
      type: String,
    },
    superpowers: [String],
    catch_phrase: {
      type: String,
    },
    images: [String],
    avatarURL: {
      type: String,
      default: '',
    },
  },

  {
    versionKey: false,
    timestamp: true,
  },
);

const Hero = model('hero', heroSchema);
module.exports = Hero;
