const express = require('express');
const router = new express.Router();
const { heroValidation } = require('../../middlewares/validation.js');
const { asyncWrapper } = require('../../helpers/apiHelpers.js');

const {
  getHeroesController,
  getHeroByIdController,
  addHeroController,
  deleteHeroController,
  UpdateHeroController,
  updateHeroImageController,
} = require('../../controllers/heroesController.js');

router.get('/', asyncWrapper(getHeroesController));
router.get('/:heroId', asyncWrapper(getHeroByIdController));
router.post('/', heroValidation, asyncWrapper(addHeroController));
router.delete('/:heroId', asyncWrapper(deleteHeroController));
router.put('/:heroId', heroValidation, asyncWrapper(UpdateHeroController));

router.patch('/:heroId/avatar', asyncWrapper(updateHeroImageController));

module.exports = { heroesRouter: router };
