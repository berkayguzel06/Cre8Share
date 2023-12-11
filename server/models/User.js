// User model is used to create a table in the database about users.

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
        },
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
        registirationDate:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
    User.associate = (models) => {
        User.hasMany(models.Post, {
            onDelete:"cascade",
        });
    };
    return User;
}