const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogComment extends Model {}

BlogComment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  blog_comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'blog_posts',
      key: 'id'
    }
  },
  date_created: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
},{
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'blog_comments'
});

module.exports = BlogComment;
