const {
    Banner
} = require('../models');
const {
    Op
} = require("sequelize");

module.exports = {
    register: async (
        bannerName,
        bannerImg,
        bannerStartDate,
        bannerEndDate,
        transaction) => {
        try {
            const banner = await Banner.create({
                bannerName,
                bannerImg,
                bannerStartDate,
                bannerEndDate,
            }, {
                transaction
            });

            return banner;
        } catch(err) {
            throw err;
        }
    },
    findById: async(id) => {
        try{
            const banner = await Banner.findOne({
                where: {
                    id
                }
            });

            return banner;
        } catch (err) {
            throw err;
        }
    },
    findAll: async () => {
        try {
            const banner = await Banner.findAll();
            return banner;
        } catch (err) {
            throw err;
        }
    },
    availableBanner: async() => {
        try {
            console.log(new Date());
            const banner = await Banner.findAll({
                where: {
                    bannerStartDate: {
                        [Op.lte]: new Date(),
                    },
                    bannerEndDate: {
                        [Op.gte]: new Date(),
                    }
            }

            });
            return banner;
        } catch (err){
            throw err;
        }
    },

}
