// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {
        likeid:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        userid:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Like;
}
