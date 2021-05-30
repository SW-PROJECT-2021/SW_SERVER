const {
  Product,
  OrderHistory
} = require('./index');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Review', {
    delivery: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // 0~2
      allowNull: true,
    },
    recommand: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // 0~2
      allowNull: true,
    },
    star: {
      type: DataTypes.INTEGER,
      defaultValue: 1, // 1~5
      allowNull: true,
    },
    detail: {
      type: DataTypes.STRING(200), // 100자 제한
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    timestamps: true,
  });
}