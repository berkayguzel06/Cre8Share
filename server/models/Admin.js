// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Admin;
}
