const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const orderHistoryMethod = require('../method/orderHistoryMethod');
const ordersMethod = require('../method/ordersMethod');
const productMethod = require('../method/productMethod');
const categoryMethod = require('../method/categoryMethod');

module.exports = {
  getTotal: async (res) => {
    try {
      const orders = await orderHistoryMethod.getTotal();
      let total = 0;

      for (let element of orders) {
        total += element.totalCost;
      }
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_ALL_TOTAL_COST_SUCCESS, {
        "totalCost": total
      }));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_ALL_TOTAL_COST_FAIL));

      return;
    }
  },
  getTotalByDate: async (startDate, endDate, res) => {
    if (!startDate || !endDate) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const stDate = new Date(startDate);
      const edDate = new Date(endDate);
      if (stDate > edDate) {
        console.log('날짜 입력 이상');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_DATE_INPUT));
      }
      const myOrders = await orderHistoryMethod.searchByDateAll(stDate, edDate);
      let total = 0;
      for (let element of myOrders) {
        total += element.totalCost;
      }
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_DATE_TOTAL_COST_SUCCESS, {
        "totalCost": total
      }));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_DATE_TOTAL_COST_FAIL));

      return;
    }
  },
  getTopProducts: async (startDate, endDate, res) => {
    if (!startDate || !endDate) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const stDate = new Date(startDate);
      const edDate = new Date(endDate);
      if (stDate > edDate) {
        console.log('날짜 입력 이상');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_DATE_INPUT));
      }
      const myOrders = await orderHistoryMethod.searchByDateAll(stDate, edDate);
      let orderIdList = [];
      for (let element of myOrders) {
        orderIdList.push(element.id);
      }

      const orders = await ordersMethod.getOrderByOrderHistory(orderIdList);
      for (let element of orders) {
        const product = await productMethod.findById(element.ProductId);
        element.Product = product;
        delete element.ProductId;
      }
      console.log(orders);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_TOP_PRODUCTS_SUCCESS, orders));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_TOP_PRODUCTS_FAIL));

      return;
    }
  },
  getTopCategory: async (startDate, endDate, res) => {
    if (!startDate || !endDate) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const stDate = new Date(startDate);
      const edDate = new Date(endDate);
      if (stDate > edDate) {
        console.log('날짜 입력 이상');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_DATE_INPUT));
      }
      const myOrders = await orderHistoryMethod.searchByDateAll(stDate, edDate);
      let orderIdList = [];
      for (let element of myOrders) {
        orderIdList.push(element.id);
      }

      const orders = await ordersMethod.getOrderByOrderHistory(orderIdList);

      const categoryMap = new Map();
      for (let element of orders) {
        const product = await productMethod.findById(element.ProductId);
        if (categoryMap.get(product.CategoryId) == undefined) {
          categoryMap.set(product.CategoryId, Number(element.total));
        } else {
          categoryMap.set(product.CategoryId, categoryMap.get(product.CategoryId) + Number(element.total));
        }
      }

      categoryMap[Symbol.iterator] = function* () {
        yield*[...this.entries()].sort((a, b) => b[1] - a[1]);
      }

      const result = [];

      let count = 0;
      for (let [key, value] of categoryMap) {
        if(count >= 5) {
          break;
        }
        const category = await categoryMethod.findById(key);
        const obj = {
          "CategoryId" : key,
          "CategoryName" : category.title,
          "total" : value 
        };
        result.push(obj);
        count++;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_TOP_CATEGORY_SUCCESS, result));

      return;
    } catch (err) {
      console.error(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_TOP_CATEGORY_FAIL));

      return;
    }
  },
}