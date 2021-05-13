module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Basket', {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    soldOut: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: true,
  });
};