module.exports = (sequelize, DataTypes) => {
	return sequelize.define('OrderHistory', {
    orderProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
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
