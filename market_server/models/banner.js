module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Banner', {
    bannerName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    bannerImg: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bannerStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bannerEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bannerDetail: {
      type: DataTypes.TEXT(),
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    timestamps: true,
  });
}
