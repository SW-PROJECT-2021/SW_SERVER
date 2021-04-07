module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Category', {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });
};