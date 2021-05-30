module.exports = (sequelize, DataTypes) => { // 일정부분 수정
  return sequelize.define('OrderHistory', {
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    orderDestination: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    orderDelivery: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
    orderStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    timestamps: true,
  });
}
