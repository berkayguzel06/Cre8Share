// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        postid:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        content:{
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Post;
}