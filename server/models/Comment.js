module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    Comment.associate = (models) => {
      Comment.hasMany(models.CommentReport, {
        onDelete: "cascade",
      });
  
      Comment.belongsTo(models.Post, {
        onDelete: "cascade", // If post delete then delete all comments related to that post
      });
  
      Comment.belongsTo(models.User, {
        onDelete: "cascade",
      });
    };
  
    return Comment;
  };
  