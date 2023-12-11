// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        adminid:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Admin;
}
