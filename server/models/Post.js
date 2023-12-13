// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        postid:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        content:{
            type: DataTypes.BLOB,
            allowNull: false
        }
    });
    Post.associate = (models) => {
        Post.hasMany(models.Comment, {
            onDelete:"cascade",
        });
        Post.hasMany(models.Like, {
            onDelete:"cascade",
        });
        Post.hasMany(models.PostReport, {
            onDelete:"cascade",
        })
    }

    return Post;
}