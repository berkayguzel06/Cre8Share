// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        postid:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        userid:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignkey: true,
        },
        content:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    })
    return Post;
}