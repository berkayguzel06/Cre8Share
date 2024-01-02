
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {
        userid:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Like.associate = (models) => {
        Like.belongsTo(models.Post, {
            onDelete : "cascade",
        });
    }
    return Like;
}
