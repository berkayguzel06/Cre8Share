// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const CommentReport = sequelize.define("CommentReport", {
        reportid:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        reportCount:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return CommentReport;
}
