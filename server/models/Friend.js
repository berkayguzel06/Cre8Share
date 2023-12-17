
module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define("Friend", {
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return Friend;
}