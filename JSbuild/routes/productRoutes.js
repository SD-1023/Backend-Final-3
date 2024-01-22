"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const productController_1 = require("../controllers/productController");
const sessionMiddleware_1 = require("../middlewares/sessionMiddleware");
router.get('/trendy', productController_1.getTrendyProducts);
router.get("/category/:category", productController_1.getProductsByCategory);
router.get("/brand/:brand", productController_1.getProductsByBrand);
router.get("/newArrival", productController_1.getNewArrivalProducts);
router.get("/limited", productController_1.getLimitedProducts);
router.get("/discount/:discount", productController_1.getProductsByDiscoutOrMore);
router.get('/handpicked', productController_1.handPicked);
router.get('/:productID', productController_1.getSpecificProduct);
router.post('/rate/:productID', sessionMiddleware_1.sessionMiddleware, productController_1.rateProduct);
router.get('/ratings-and-reviews/:productID', productController_1.getRateAndReview);
exports.default = router;