const {
    Coupon
} = require('../models');

module.exports = {
    register: async (
        couponName,
        couponCode,
        minimumPrice,
        discountRate,) => {
        try {
            const coupon = await Coupon.create({
                couponName,
                couponCode,
                minimumPrice,
                discountRate,
            });

            return coupon;
        } catch (err) {
            throw err;
        }
    },
}