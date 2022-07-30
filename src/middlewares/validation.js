const joi = require('joi');

const { ValidationError } = require('../helpers/errors');

const heroValidation = (req, res, next) => {
  const validationSchema = joi.object({
    nickname: joi.string().min(3).max(30).required(),
    real_name: joi.string().min(3).max(30).required(),
    origin_description: joi.string(),
    superpowers: joi.array().items(joi.string()),
    catch_phrase: joi.string(),
    images: joi.array().items(joi.string()),
    avatarURL: joi.string(),
  });

  const validationResult = validationSchema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error));
  }

  next();
};

module.exports = { heroValidation };
