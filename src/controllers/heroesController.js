const uuid = require('uuid');
const path = require('path');
const {
  heroesList,
  heroFinderById,
  heroRemover,
  heroAdder,
  heroUpdater,
  heroImageUpdater,
} = require('../services/heroesServices.js');

const { WrongParametersError } = require('../helpers/errors');

const getHeroesController = async (req, res) => {
  let { limit, page } = req.query;
  page = page || 1;
  limit = limit || 5;
  let offset = page * limit - limit;
  const data = await heroesList(offset, limit);
  res.json({ status: 'success', code: 200, data });
};

const getHeroByIdController = async (req, res) => {
  const { heroId } = req.params;

  const data = await heroFinderById(heroId);
  if (!data) {
    throw new WrongParametersError(`There is no hero with id: ${heroId}`);
  }
  res.json({
    status: 'success',
    code: 200,
    data,
  });
};

const addHeroController = async (req, res) => {
  let {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  } = req.body;

  const { avatarURL } = req.files;
  let avatarFileName = uuid.v4() + '.jpg';
  avatarURL.mv(
    path.resolve(__dirname, '..', '..', 'public', 'images', avatarFileName),
  );

  const newHero = {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
    avatarURL: avatarFileName,
  };

  const data = await heroAdder(newHero);
  res.status(201).json({
    status: 'success',
    code: 201,
    data,
  });
};

const deleteHeroController = async (req, res) => {
  const { heroId } = req.params;

  const data = await heroRemover(heroId);
  if (!data) {
    throw new WrongParametersError(`There is no hero with id: ${heroId}`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: `The hero with id: ${heroId}, nickname: ${data.nickname} successfuly removed`,
    data,
  });
};

const UpdateHeroController = async (req, res) => {
  const { heroId } = req.params;
  const body = req.body;

  if (!body) {
    throw new WrongParametersError('Please enter a correct values');
  }

  const data = await heroUpdater(heroId, body);

  if (!data) {
    throw new WrongParametersError(`There is no hero with id: ${heroId}`);
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

const updateHeroImageController = async (req, res) => {
  const { heroId } = req.params;

  const { avatarURL } = req.files;
  let avatarFileName = uuid.v4() + '.jpg';
  avatarURL.mv(
    path.resolve(__dirname, '..', '..', 'public', 'images', avatarFileName),
  );

  const data = await heroImageUpdater(heroId, avatarFileName);
  if (!data) {
    throw new WrongParametersError(`There is no hero with id: ${heroId}`);
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: data,
  });
};

module.exports = {
  getHeroesController,
  getHeroByIdController,
  addHeroController,
  deleteHeroController,
  UpdateHeroController,
  updateHeroImageController,
};
