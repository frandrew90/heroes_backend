const heroSchema = require('../db/schemas/heroSchema.js');

const heroesList = async (offset, limit) => {
  const heroes = await heroSchema.find({}, null, { skip: offset, limit });
  return heroes;
};

const heroFinderById = async heroId => {
  const heroById = await heroSchema.findById(heroId);

  return heroById;
};

const heroRemover = async heroId => {
  const removedHero = await heroSchema.findByIdAndRemove(heroId);
  return removedHero;
};

const heroAdder = async newHero => {
  const { nickname } = newHero;
  const hero = await heroSchema.findOne({ nickname });
  if (hero) {
    throw new Error(`Hero with name ${nickname} already exists`);
  }

  const createdHero = await heroSchema.create(newHero);
  return createdHero;
};

const heroUpdater = async (heroId, body) => {
  const heroForUpdate = await heroSchema.findByIdAndUpdate(
    heroId,
    { ...body },
    {
      new: true,
    },
  );
  return heroForUpdate;
};

const heroImageUpdater = async (heroId, newAvatar) => {
  const heroForUpdate = await heroSchema.findByIdAndUpdate(
    heroId,
    { avatarURL: newAvatar },
    {
      new: true,
    },
  );
  return heroForUpdate;
};

module.exports = {
  heroesList,
  heroFinderById,
  heroRemover,
  heroAdder,
  heroUpdater,
  heroImageUpdater,
};
