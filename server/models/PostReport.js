// Post model is used to create a table in the database about posts.

module.exports = (sequelize, DataTypes) => {
    const PostReport = sequelize.define("PostReport", {
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
    return PostReport;
}
