const express = require('express');
const router = express.Router();
const BannerController = require('../Controllers/BannerCont');

router.post('/banners', BannerController.addBanner);
router.get('/banners', BannerController.getBanners);
router.get('/banners/:id', BannerController.getBannerById);
router.put('/banners/:id', BannerController.updateBanner);
router.delete('/banners/:id', BannerController.deleteBanner);

module.exports = router;
