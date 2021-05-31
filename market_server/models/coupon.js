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
        isAllCoupon: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        minimumPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        maximumDiscount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: true,
    });
}
