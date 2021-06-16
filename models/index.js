const User = require('./User');
const BlogPost = require('./BlogPost');
const BlogComment = require('./BlogComment');

User.hasMany(BlogPost, {
    foreignKey: 'user_id'
});
BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

User.hasMany(BlogComment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});
BlogComment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

BlogPost.hasMany(BlogComment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})
BlogComment.belongsTo(BlogPost, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

module.exports = { User, BlogPost, BlogComment };

