const bannerService = require('../service/bannerService');


module.exports = {
    registerBanner: async (req, res) => {
        const imgFile = req.file;
        const {
            name,
            startDate,
            endDate
        } = req.body;

        await bannerService.register(
            name,
            imgFile,
            startDate,
            endDate,
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
    findAllBanner: async  (req, res) => {
        await bannerService.findAll(res);

        return res;
    },
    availableBanner:async (req, res) => {
        await bannerService.available(res);

        return res;
    }

}
