const sequelize = require('../config/connection');
const { User, BlogPost, BlogComment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogPost of postData) {
    await BlogPost.create({
      ...blogPost
    //   user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const blogComment of commentData) {
    await BlogComment.create({
      ...blogComment
    //   user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
