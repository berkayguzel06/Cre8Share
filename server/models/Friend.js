
module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define("Friend", {
        friendid:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return Friend;
}