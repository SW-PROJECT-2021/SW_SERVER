const {
    Banner, sequelize
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
        bannerDetail) => {
        try {
            const banner = await Banner.create({
                bannerName,
                bannerImg,
                bannerStartDate,
                bannerEndDate,
                bannerDetail,
            });

            return banner;
        } catch (err) {
            throw err;
        }
    },
    findById: async (id) => {
        try {
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
    availableBanner: async () => {
        try {
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
        } catch (err) {
            throw err;
        }
    },
    update: async (
        id,
        bannerName,
        bannerImg,
        bannerStartDate,
        bannerEndDate,
        bannerDetail,
    ) => {
        try {
            await Banner.update({
                bannerName,
                bannerImg,
                bannerStartDate,
                bannerEndDate,
                bannerDetail,
            }, {
                where: {
                    id
                }
            });

        } catch (err) {
            throw err;
        }
    },
    searchDate: async (startDate) => {
        try {
            const banner = await Banner.findAll({
                where: {
                    bannerStartDate: {
                        [Op.gte]: startDate,
                    },
                }
            });
            return banner;
        }

        catch (err) {
            throw err;
        }
    },
    sortBanner: async (sort, direction) => {
        try {
            const banner = await Banner.findAll({
                where: {
                    bannerStartDate: {
                        [Op.lte]: new Date(),
                    },
                    bannerEndDate: {
                        [Op.gte]: new Date(),
                    }
                },
                order: [[sort, direction]]
            });
            console.log(sort)
            return banner;
        } catch (err) {
            throw err;
        }
    },
}

