const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const orderHistoryMethod = require('../method/orderHistoryMethod');
const userMethod = require('../method/userMethod');
const productMethod = require('../method/productMethod');
const ordersMethod = require('../method/OrdersMethod');
const {
    sequelize
} = require('../models');
const {
    BAD_REQUEST
} = require('../modules/statusCode');
const {
    Utils
} = require('sequelize');
const orders = require('../models/orders');


let transaction;

module.exports = {
    findOrderHistory: async (UserId, res) => {
        try {
            const user = await userMethod.readOneLoginId(UserId);
            const userId = user.id;

            const myOrders = await orderHistoryMethod.getMyOrder(userId);
            const processedOrder = myOrders.map(data => data.get({
                plain: true
            }));
            for (element of processedOrder) {
                for (let orders of element.Ordered) {
                    orders.count = orders.Orders.productCount;
                    delete orders.Orders;
                }
            }
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_MY_ORDER_SUCCESS, processedOrder));

            return;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_MY_ORDER_FAIL));

            return;
        }
    },
    findAllOrder: async (res) => {
        try {
            const myOrders = await orderHistoryMethod.getAllOrder();
            const processedOrder = myOrders.map(data => data.get({
                plain: true
            }));
            for (element of processedOrder) {
                const user = await userMethod.findById(element.UserId);
                element.UserId = user.loginId;
                for (let orders of element.Ordered) {
                    orders.count = orders.Orders.productCount;
                    delete orders.Orders;
                }
            }
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_ORDERHISTORY_SUCCESS, processedOrder));

            return;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_ORDERHISTORY_FAIL));

            return;
        }
    },
    searchByDate: async (
        UserId,
        startDate,
        endDate,
        res) => {
        if (!startDate || !endDate) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }

        try {
            const user = await userMethod.readOneLoginId(UserId);
            const userId = user.id;
            const stDate = new Date(startDate);
            const edDate = new Date(endDate);
            if(stDate > edDate) {
                console.log('날짜 입력 이상');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_DATE_INPUT));
            }
            const myOrders = await orderHistoryMethod.searchByDate(userId, stDate, edDate);
            const processedOrder = myOrders.map(data => data.get({
                plain: true
            }));
            for (element of processedOrder) {
                for (let orders of element.Ordered) {
                    orders.count = orders.Orders.productCount;
                    delete orders.Orders;
                }
            }
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_MY_ORDER_SUCCESS, processedOrder));

            return;
        } catch(err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_MY_ORDER_FAIL));

            return;
        }
    },
    searchByDateAll: async (
        startDate,
        endDate,
        res) => {
        if (!startDate || !endDate) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }

        try {
            const stDate = new Date(startDate);
            const edDate = new Date(endDate);
            if(stDate > edDate) {
                console.log('날짜 입력 이상');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_DATE_INPUT));
            }
            const myOrders = await orderHistoryMethod.searchByDateAll(stDate, edDate);
            const processedOrder = myOrders.map(data => data.get({
                plain: true
            }));
            for (element of processedOrder) {
                const user = await userMethod.findById(element.UserId);
                element.UserId = user.loginId;
                for (let orders of element.Ordered) {
                    orders.count = orders.Orders.productCount;
                    delete orders.Orders;
                }
            }
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_ALL_ORDER_SUCCESS, processedOrder));

            return;
        } catch(err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_MY_ORDER_FAIL));

            return;
        }
    },
    // 트랜잭션 묶긴했는데 우리 RDS가 견뎌주겠지..?
    register: async (
        UserId,
        orderDate,
        orderDestination,
        productList,
        res) => {
        if (!orderDate || !orderDestination || productList.length == 0) {
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            transaction = await sequelize.transaction();
            const user = await userMethod.readOneLoginId(UserId);
            const userId = user.id;
            for (element of productList) {
                const product = await productMethod.findById(element.ProductId);
                if (!product || product.isDeleted) {
                    console.log("해당 상품이 존재하지 않습니다.")
                    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_PRODUCT));

                    return;
                }
                if (product.count < element.productCount) {
                    console.log("상품의 수량이 부족합니다.");
                    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.LACK_PRODUCT));

                    return;
                }
                await productMethod.sell(product.id, product.count - element.productCount, transaction);
            }

            const orderHistoryObj = await orderHistoryMethod.register(userId, orderDate, orderDestination, transaction);
            for (element of productList) {
                element.OrderHistoryId = orderHistoryObj.id;
                console.log(element);
            }
            const orders = await ordersMethod.register(productList, transaction);

            await transaction.commit();
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_ORDER_SUCCESS, orders));

            return;
        } catch (err) {
            console.error(err);
            if (transaction) await transaction.rollback();
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.REGISTER_ORDER_FAIL));
        }
    }
}