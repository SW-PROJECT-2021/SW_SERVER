const couponService = require('../service/couponService');

module.exports = {
    registerCoupon: async (req, res) => {
        const {
            name,
            code,
            minimumPrice,
            discountRate,
        } = req.body;

        await couponService.register(
            name,
            code,
            minimumPrice,
            discountRate,
            res);

        return res;
    },
    issueAll: async (req, res) => {
        const {
            couponId
        } = req.body;


        await couponService.issueAll(
            couponId,
            res);

        return res;
    },
    isesueUser: async (req, res) => {
        const {
            couponId,
            userId,
        } = req.body;


        await couponService.issueUser(
            couponId,
            userId,
            res);

        return res;
    },
    searchAvailableUser: async (req, res) => {
        const {
            couponId,
        } = req.body;

        await couponService.searchUser(
            couponId,
            res);

        return res;
    },
    searchAvailableCoupon: async (req, res) => {
        const {
            userId,
        } = req.body;

        await couponService.searchCoupon(
            userId,
            res);

        return res;
    },

}