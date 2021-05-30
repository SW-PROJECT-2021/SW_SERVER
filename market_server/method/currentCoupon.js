const {
    CurrentCoupon
} = require('../models');

module.exports = {
    issue: async (
        CouponId,
        UserId) => {
        try {
            const Coupons = await CurrentCoupon.create({
                CouponId,
                UserId
            });

            return Coupons;
        } catch (err) {
            throw err;
        }
    },
    searchUser: async (CouponId) => {
        try {
            const Users = await CurrentCoupon.findAll({
                where: {
                    CouponId,
                },
            });

            return Users;
        } catch (err) {
            throw err;
        }
    },
    searchCoupon: async (UserId) => {
        try {
            const Coupons = await CurrentCoupon.findAll({
                where: {
                    UserId,
                },
            });

            return Coupons;
        } catch (err) {
            throw err;
        }
    },
    available: async (CouponId, UserId) => {
        try {
            const Coupons = await CurrentCoupon.findOne({
                where: {
                    CouponId,
                    UserId
                },
            });

            return Coupons;
        } catch (err) {
            throw err;
        }
    },
}