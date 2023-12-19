// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const CommentReport = sequelize.define("CommentReport", {
        reportCount:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    CommentReport.associate = (models) => {
        CommentReport.belongsTo(models.Comment);
    }
    return CommentReport;
}
