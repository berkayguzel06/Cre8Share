
module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define("Friend", {
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        friendID:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Friend.associate = (models) => {
        Friend.belongsTo(models.User, {
            onDelete: "cascade", // Enable cascading delete for the association with User
        });
    }
    return Friend;
}