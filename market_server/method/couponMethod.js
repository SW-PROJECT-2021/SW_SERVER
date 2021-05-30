const {
    Coupon
} = require('../models');

module.exports = {
    registerAll: async (
        couponName,
        couponCode,
        isAllCoupon,
        minimumPrice,
        discount,) => {
        try {
            const coupon = await Coupon.create({
                couponName,
                couponCode,
                isAllCoupon,
                minimumPrice,
                discount,
            });

            return coupon;
        } catch (err) {
            throw err;
        }
    },
    register: async (
        couponName,
        couponCode,
        isAllCoupon,
        discount,
        categoryId,
        maximumDiscount) => {
        try {
            const coupon = await Coupon.create({
                couponName,
                couponCode,
                isAllCoupon,
                discount,
                categoryId,
                maximumDiscount
            });

            return coupon;
        } catch (err) {
            throw err;
        }
    },
    searchByCode: async (
        couponCode) => {
        try {
            const coupon = await Coupon.findOne({
                where: {
                    couponCode
                }
            });

            return coupon;
        } catch (err) {
            throw err;
        }
    },
    searchByCouponId: async (
        id) => {
        try {
            const coupon = await Coupon.findOne({
                where: {
                    id
                }
            });

            return coupon;
        } catch (err) {
            throw err;
        }
    },
}