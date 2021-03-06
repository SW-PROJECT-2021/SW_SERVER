module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    img1: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    img2: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    img3: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT(),
      allowNull: true
    },
    delivery: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
  }, {
    freezeTableName: true,
    timestamps: true,
  });
};