
module.exports = (sequelize, DataTypes) => {
    const CommentReport = sequelize.define("CommentReport", {
        userid:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    CommentReport.associate = (models) => {
        CommentReport.belongsTo(models.Comment,{
            onDelete: "cascade",
        });
    }
    return CommentReport;
}
