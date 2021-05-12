const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const bannerMethod  = require('../method/bannerMethod');


const {
    sequelize
} = require('../models');
const { BAD_REQUEST } = require('../modules/statusCode');
const { Utils } = require('sequelize');

let transaction;


module.exports = {
    register: async (
        name,
        imgFile,
        startDate,
        endDate,
        res
    ) => {
       if(!name || ! imgFile || !startDate || !endDate){
           console.log('필요값 누락');

           res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
           return;
       }
       try{
           transaction = await sequelize.transaction();

           const banner = await bannerMethod.register(name, imgFile.location, startDate, endDate, transaction);
           res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_BANNER_SUCCESS, banner));
           transaction.commit();

           

              return res;
       } catch(err) {
           console.error(err);
           if (transaction) await transaction.rollback();
           res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.REGISTER_BANNER_FAIL));
           return;
       }
    },
    findBanner: async (id, res) => {
        if(!id) {
            console.log('필요값 누락');

            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
        }

        try {
            const banner = await bannerMethod.findById(id);
            if(!banner){
                console.log("해당 배너가 존재하지 않습니다.");
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_BANNER));

                return;
            }

            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_BANNER_BY_ID_SUCCESS, banner));

            return;
        } catch (err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_BANNER_BY_ID_FAIL));
      
            return;
        }
    },
    findAll: async (res) => {
        try {
            const banners = await bannerMethod.findAll();
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_BANNER_SUCCESS, banners));

            return;
        } catch (err) {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_BANNER_FAIL));

            return;
        }
    },
    available: async (res) => {
        try {
            const banners = await bannerMethod.availableBanner();
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_AVAILABLE_BANNER_SUCCESS, banners));

            return;
        } catch (err) {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_AVAILABLE_BANNER_FAIL));

            return;
        }
        
    },
    
}
