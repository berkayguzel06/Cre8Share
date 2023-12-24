// Comment model is used to create a table in the database about comments.

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        content:{
            type: DataTypes.STRING,
            allowNull: true
        },
    });
    Comment.associate = (models) => {
        Comment.hasMany(models.CommentReport, {
            onDelete:"cascade",
        })
        Comment.belongsTo(models.Post);
        Comment.belongsTo(models.User);
    }
    return Comment;
}