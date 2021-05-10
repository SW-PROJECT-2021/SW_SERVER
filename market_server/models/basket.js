module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Basket', {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: true,
  });
};