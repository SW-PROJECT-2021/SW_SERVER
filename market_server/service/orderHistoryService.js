const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const orderHistoryMethod  = require('../method/orderHistoryMethod');
const userMethod = require('../method/userMethod');


const {
    sequelize
} = require('../models');
const { BAD_REQUEST } = require('../modules/statusCode');
const { Utils } = require('sequelize');


let transaction;


module.exports = {
    findOrderHistory: async (UserId, res) => {

        try {
            const user = await userMethod.readOneLoginId(UserId);
            const userId = user.id;

            const myOrders = await orderHistoryMethod.getOrderHistory(userId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_ORDERHISTORY_SUCCESS, myOrders));

            console.log("jisososo");
            return;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_ORDERHISTORY_FAIL));
      
            return;
        }
    },    
}
