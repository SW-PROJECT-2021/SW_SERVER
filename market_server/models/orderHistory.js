module.exports = (sequelize, DataTypes) => { // 일정부분 수정
  return sequelize.define('OrderHistory', {
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderDestination: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

  }, {
    freezeTableName: true,
    timestamps: true,
  });
}
