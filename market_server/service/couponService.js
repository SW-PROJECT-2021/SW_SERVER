const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const couponMethod = require('../method/couponMethod');
const CurrentCouponMethod = require('../method/currentCouponMethod');
const userMethod = require('../method/userMethod');
const { Coupon } = require('../models');
const currentCouponMethod = require('../method/currentCouponMethod');


module.exports = {
    register: async (
        name,
        code,
        isAll,
        minimumPrice,
        discount,
        categoryId,
        maximumDiscount,
        res
    ) => {
        if (isAll == true) {
            if (!name || !code || !minimumPrice || !discount) {
                console.log('필요값 누락');
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
                return;
            }

        } else {
            if (isAll === undefined || !name || !code || !discount || !categoryId || !maximumDiscount) {
                console.log('필요값 누락');
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
                return;
            }

            if (discount > 100) {
                console.log("너무 높은 discounRate");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SO_BIG_DISCOUNT_RATE));
            }

        }

        const coupon = await couponMethod.searchByCode(code);
        if (coupon != undefined) {

            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.EXIST_COUPON));
        }
        try {
            if (isAll) {
                const coupon = await couponMethod.registerAll(name, code, isAll, minimumPrice, discount);
                res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_COUPON_SUCCESS, coupon));

                return res;
            }
            else {
                const coupon = await couponMethod.register(name, code, isAll, discount, categoryId, maximumDiscount);
                res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_COUPON_SUCCESS, coupon));

                return res;
            }
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.REGISTER_COUPON_FAIL));
            return;
        }
    },
    getAll: async (
        res) => {
        try {
            const coupons = await couponMethod.getAll();
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_COUPON_SUCCESS, coupons));

            return res;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_COUPON_FAIL));
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
    isTrue: async (
        UserId,
        code,
        res
    ) => {
        if (!UserId || !code) {
            console.log('필요값 누락');

            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
        }
        try {
            const user = await userMethod.readOneLoginId(UserId);
            const userId = user.id;

            const coupon = await couponMethod.searchByCode(code);

            if (!coupon) {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_AVAILABLE_COUPON))
                return;
            }
            const isAvailable = await CurrentCouponMethod.available(coupon.id, userId);

            if (isAvailable != null) {
                res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.AVAILABLE_COUPON, coupon));
            }
            else {

                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_AVAILABLE_USER_COUPON));
                return;
            }



            return res;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_ALL_COUPON_BY_COUPON_FAIL));
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
            const userList = await CurrentCouponMethod.searchUser(couponId);
            if (userList.length === 0) {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_USER));
                return;
            }

            const users = [];
            const userIds = userList.map(coupons => coupons.UserId);
            for (let userId of userIds) {
                const user = await userMethod.findAll(userId);
                users.push(user);
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
            const couponList = await CurrentCouponMethod.searchCoupon(userId);
            if (couponList.length === 0) {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_COUPON));
                return;
            }

            const coupons = [];
            const couponIds = couponList.map(coupons => coupons.CouponId);
            for (let couponId of couponIds) {
                const coupon = await couponMethod.searchByCouponId(couponId);
                coupons.push(coupon);
            }

            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_ALL_COUPON_BY_USER_SUCCESS, coupons));

            return res;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_ALL_COUPON_BY_USER_SUCCESS));
            return;
        }
    },
    deleteCoupon: async (
        couponId,
        res
    ) => {
        if (!couponId) {
            console.log('필요값 누락');

            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
        }
        try {
            await couponMethod.delete(couponId);
            await currentCouponMethod.delete(couponId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_COUPON_SUCCESS,
                { "deletedId": couponId }));

            return res;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_COUPON_FAIL));
            return;
        }
    },
}