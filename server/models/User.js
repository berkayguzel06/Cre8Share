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
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pfp:{
            type: DataTypes.BLOB('long'),
            allowNull: true
        },
        banner:{
            type: DataTypes.BLOB('long'),
            allowNull: true
        }
        
    });
    User.associate = (models) => {
        User.hasMany(models.Post, {
            onDelete: 'cascade',
        });
        User.hasMany(models.Friend, {
            onDelete: 'cascade',
        });
        User.hasMany(models.Comment, {
            onDelete: 'cascade',
        });
    }
    return User;
}