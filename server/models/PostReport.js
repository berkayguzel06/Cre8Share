
module.exports = (sequelize, DataTypes) => {
    const PostReport = sequelize.define("PostReport", {
        userid:{
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
