// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {
        userid:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Like.associate = (models) => {
        Like.belongsTo(models.Post);
    }
    return Like;
}
