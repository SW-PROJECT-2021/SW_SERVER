const bannerService = require('../service/bannerService');


module.exports = {
    registerBanner: async (req, res) => {
        const imgFile = req.file;
        const {
            name,
            startDate,
            endDate,
            detail
        } = req.body;

        await bannerService.register(
            name,
            imgFile,
            startDate,
            endDate,
            detail,
            res);

        return res;
    },

    findBannerById: async (req, res) => {
        const {
            id
        } = req.params;
        await bannerService.findBanner(id, res);

        return res;
    },
    findAllBanner: async (req, res) => {
        await bannerService.findAll(res);

        return res;
    },
    availableBanner: async (req, res) => {
        await bannerService.available(res);

        return res;
    },
    updateBannerById: async (req, res) => {
        let imgFile = req.file;
        const {
            id,
            name,
            startDate,
            endDate,
            detail,
            img
        } = req.body;
        if (!imgFile) {
            imgFile = img;
        }

        await bannerService.updateBanner(
            id,
            name,
            imgFile,
            startDate,
            endDate,
            detail,
            res);

        return res;
    },
    searchBannerByStartDate: async (req, res) => {
        const {
            startDate
        } = req.params;

        await bannerService.searchByDate(startDate, res);

        return res;
    },
    sortBanner: async (req, res) => {
        const {
            sort,
            direction,
        } = req.body;

        await bannerService.sortBanner(
            sort,
            direction,
            res);

        return res;
    },

}
