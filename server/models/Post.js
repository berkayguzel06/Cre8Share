
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        content:{
            type: DataTypes.BLOB('long'),
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        like:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        report:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    });
    Post.associate = (models) => {
        Post.hasMany(models.Comment, {
            onDelete:"cascade",
        });
        Post.hasMany(models.Like, {
            onDelete:"cascade",
        });
        Post.hasMany(models.PostReport, {
            onDelete:"cascade",
        });
        Post.belongsTo(models.User, {
            onDelete:"cascade",
        });
    }
    
    return Post;
}