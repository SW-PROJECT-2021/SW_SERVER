module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Destination', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    addressName: {
      type: DataTypes.STRING(100), // 유니크하게 처리
      allowNull: false,
    },
    zonecode: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    timestamps: true,
  });
};