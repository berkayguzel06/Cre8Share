// User model is used to create a table in the database about users.

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
    User.associate = (models) => {
        User.hasMany(models.Post, {
            onDelete: 'cascade',
        });
        User.hasMany(models.Friend, {
            onDelete: 'cascade',
        });
    }
    return User;
}