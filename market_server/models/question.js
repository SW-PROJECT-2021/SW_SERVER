const {
  Product,
  OrderHistory
} = require('./index');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Question', {
    title: {
      type: DataTypes.STRING(100), // 50자로 제한
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT(),
      allowNull: true,
    },
    isAnswer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    timestamps: true,
  });
}