// module.exports = Post;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class BlogPost extends Model {}

// create fields/columns for Post model
BlogPost.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date_created: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  }
},{
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'blog_posts'
});

module.exports = BlogPost;
