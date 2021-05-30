const {
    Coupon,
    User
} = require('./index');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('CurrentCoupon', {
        // userId: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: User,
        //         key: 'id',
        //     }
        // },
        // couponID: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: Coupon,
        //         key: 'id',
        //     }
        // },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
}
