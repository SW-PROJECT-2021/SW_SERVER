module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    loginId: {
      type: DataTypes.STRING(30),
      // unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      // unique: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });
};