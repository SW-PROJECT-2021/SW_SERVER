module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coupon', {
        couponName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        couponCode: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        minimumPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discountRate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: true,
    });
}
