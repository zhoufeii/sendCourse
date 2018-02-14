let express = require('express');
let goods = require('../controls/goods');
let api = require('../api');


let router = express.Router();

// goods
router.get(api.goodsList, goods.fetchAll);

router.post(api.goodsDetail, goods.fetchById);
router.post(api.goodsAdd, goods.addOne);
router.post(api.goodsDelete, goods.deleteOne);
router.post(api.goodsDeleteMulti, goods.deleteMulti);


module.exports = router;