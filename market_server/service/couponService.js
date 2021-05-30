const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const couponMethod = require('../method/couponMethod');
const CurrentCouponMethod = require('../method/currentCoupon');
const userMethod = require('../method/userMethod');


module.exports = {
    register: async (
        name,
        code,
        minimumPrice,
        discountRate,
        res
    ) => {
        if (!name || !code || !minimumPrice || !discountRate) {
            console.log('필요값 누락');

            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
        }
        if (discountRate > 100) {
            console.log("너무 높은 discounRate");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SO_BIG_DISCOUNT_RATE));
        }
        try {
            const coupon = await couponMethod.register(name, code, minimumPrice, discountRate);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_COUPON_SUCCESS, coupon));

            return res;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.REGISTER_COUPON_FAIL));
            return;
        }
    },
    issueAll: async (
        couponId,
        res
    ) => {
        if (!couponId) {
            console.log('필요값 누락');

            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
        }
        try {

            const users = await userMethod.findAll();
            let userList = users.map(user => user.id);

            const alreadyUsers = await CurrentCouponMethod.searchUser(couponId);
            let alreadyUserList = alreadyUsers.map(alreadyUser => alreadyUser.UserId);
            let alreadyUserId = 0;

            for (let userId of userList) {
                for (alreadyUserId of alreadyUserList) {
                    if (alreadyUserId == userId) {
                        break;
                    }
                }
                if (alreadyUserId != userId) {
                    const currentCoupon = await CurrentCouponMethod.issue(couponId, userId);
                }
            }

            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.ISSUE_COUPON_ALL_SUCCESS, { "issueCouponId": couponId }));

            return res;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.ISSUE_COUPON_ALL_FAIL));
            return;
        }
    },
    issueUser: async (
        couponId,
        userId,
        res
    ) => {
        if (!couponId || !userId) {
            console.log('필요값 누락');

            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
        }
        try {

            const alreadyCoupons = await CurrentCouponMethod.searchCoupon(userId);
            let alreadyCouponList = alreadyCoupons.map(alreadyCoupon => alreadyCoupon.CouponId);

            for (let alreadyCouponId of alreadyCouponList) {
                if (couponId == alreadyCouponId) {
                    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_COUPON))
                    return;
                }
            }
            const currentCoupon = await CurrentCouponMethod.issue(couponId, userId);

            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.ISSUE_COUPON_USER_SUCCESS, { "issueCouponId": couponId, "userId": userId }));

            return res;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.ISSUE_COUPON_USER_FAIL));
            return;
        }
    },
    searchUser: async (
        couponId,
        res
    ) => {
        if (!couponId) {
            console.log('필요값 누락');


            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
        }
        try {
            const users = await CurrentCouponMethod.searchUser(couponId);
            if (users.length === 0) {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_USER));
                return;
            }

            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_ALL_COUPON_BY_COUPON_SUCCESS, users));

            return res;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_ALL_COUPON_BY_COUPON_FAIL));
            return;
        }
    },
    searchCoupon: async (
        userId,
        res
    ) => {
        if (!userId) {
            console.log('필요값 누락');

            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
        }
        try {
            const coupons = await CurrentCouponMethod.searchCoupon(userId);
            if (coupons.length === 0) {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_COUPON));
                return;
            }
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_ALL_COUPON_BY_USER_SUCCESS, coupons));

            return res;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_ALL_COUPON_BY_USER_SUCCESS));
            return;
        }
    },

}