// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const PostReport = sequelize.define("PostReport", {
        reportCount:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    PostReport.associate = (models) => {
        PostReport.belongsTo(models.Post, {
            onDelete:"cascade",
        });
    }
    return PostReport;
}
