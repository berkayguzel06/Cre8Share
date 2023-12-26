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
        onDelete: "cascade", // Enable cascading delete for the association with Post
      });
  
      Comment.belongsTo(models.User, {
        onDelete: "cascade", // Enable cascading delete for the association with User
      });
    };
  
    return Comment;
  };
  