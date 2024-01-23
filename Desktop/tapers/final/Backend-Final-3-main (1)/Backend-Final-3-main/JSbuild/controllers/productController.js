"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRateAndReview = exports.rateProduct = exports.getSpecificProduct = exports.handPicked = exports.getTrendyProducts = exports.getCatogeries = exports.getOrders = exports.getAddress = void 0;
var db_1 = require("../config/db");
var modelsRelations_1 = require("../models/modelsRelations");
var wishlistUtils_1 = require("../utils/wishlistUtils");
var sequelize_1 = require("sequelize");
var getAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, address, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userID = req.user.userID;
                if (!userID) {
                    return [2 /*return*/, res.status(400).json({ error: 'useris is required' })];
                }
                return [4 /*yield*/, modelsRelations_1.addressModel.findAll({
                        attributes: ['street', 'state', 'city', 'pinCode'],
                        include: [
                            {
                                model: modelsRelations_1.userModel,
                                attributes: ['firstName', 'lastName', 'mobile'],
                                required: false
                            }
                        ],
                        where: {
                            userID: userID
                        }
                    })];
            case 1:
                address = _a.sent();
                if (!address) {
                    return [2 /*return*/, res.status(400).json('Not Found')];
                }
                return [2 /*return*/, res.json({ address: address })];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(500).json({ error: 'Internal Server Error' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAddress = getAddress;
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var state, userID, orders, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                state = req.query.state;
                userID = req.user.userID;
                if (!userID) {
                    return [2 /*return*/, res.status(400).json({ error: 'useris is required' })];
                }
                return [4 /*yield*/, modelsRelations_1.orderModel.findAll({
                        attributes: ['orderID', 'date', 'grandTotal', 'isPaid'],
                        where: {
                            state: state,
                            isPaid: true
                        },
                    })];
            case 1:
                orders = _a.sent();
                if (!orders) {
                    res.status(400).json("Not Found");
                }
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error fetching all orders:', error_2.message);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrders = getOrders;
var getCatogeries = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var category, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, modelsRelations_1.categoryModel.findAll({
                            attributes: ["name"],
                        })];
                case 1:
                    category = _a.sent();
                    return [2 /*return*/, res.status(200).json({ "category": category })];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, res.status(500).json({ error: 'Failed to get category', details: err_1.message })];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getCatogeries = getCatogeries;
var getTrendyProducts = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productsWithIsAdded, page, pageSize, trendyProducts, count, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    productsWithIsAdded = [];
                    page = Number(req.query.page) || 1;
                    pageSize = Number(req.query.pageSize) || 20;
                    return [4 /*yield*/, modelsRelations_1.productModel.findAll({
                            attributes: [
                                "productID",
                                "title",
                                "subTitle",
                                "price",
                                "discount",
                                [db_1.sequelize.literal('(SELECT AVG(rating) FROM ratings WHERE ratings.productID = products.productID)'), 'avgRating'],
                            ],
                            include: [
                                {
                                    model: modelsRelations_1.imageModel,
                                    attributes: ['imgPath'],
                                    where: db_1.sequelize.literal('position = 1'),
                                    required: false
                                },
                                {
                                    model: modelsRelations_1.ratingModel,
                                    attributes: [
                                        [db_1.sequelize.literal('(SELECT count(rating) FROM ratings WHERE ratings.productID = products.productID)'), 'ratingsCount'],
                                    ]
                                }
                            ],
                            having: db_1.sequelize.literal('avgRating >= 4.5'),
                            order: [[db_1.sequelize.literal('avgRating'), 'DESC']],
                            limit: pageSize,
                            offset: (page - 1) * pageSize,
                        })];
                case 1:
                    trendyProducts = _a.sent();
                    count = trendyProducts.length;
                    return [4 /*yield*/, getProductsAndIsAdded(req, trendyProducts)];
                case 2:
                    productsWithIsAdded = _a.sent();
                    return [2 /*return*/, res.status(200).json({ "count": count, "products": productsWithIsAdded })];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, res.status(500).json({ error: 'Failed to get products', details: err_2.message })];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getTrendyProducts = getTrendyProducts;
function isAuthorized(req) {
    return __awaiter(this, void 0, void 0, function () {
        var headersData, foundSession, foundUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headersData = req.headers;
                    if (!!headersData.authorization) return [3 /*break*/, 1];
                    return [2 /*return*/, false];
                case 1: return [4 /*yield*/, modelsRelations_1.sessionModel.findOne({ where: { sessionID: headersData.authorization } })];
                case 2:
                    foundSession = _a.sent();
                    return [4 /*yield*/, modelsRelations_1.userModel.findOne({ where: { userID: foundSession.userID } })];
                case 3:
                    foundUser = _a.sent();
                    return [2 /*return*/, foundUser.userID];
            }
        });
    });
}
function getProductsAndIsAdded(req, products) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, isAddedPromises, isAddedResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, isAuthorized(req)];
                case 1:
                    userID = _a.sent();
                    if (!userID) {
                        return [2 /*return*/, products.map(function (product, index) { return (__assign(__assign({}, product.toJSON()), { isAddedToWishList: 0 })); })];
                    }
                    isAddedPromises = products.map(function (product) { return (0, wishlistUtils_1.isAdedToWishlist)(userID, product.productID); });
                    return [4 /*yield*/, Promise.all(isAddedPromises)];
                case 2:
                    isAddedResults = _a.sent();
                    return [2 /*return*/, products.map(function (product, index) { return (__assign(__assign({}, product.toJSON()), { isAddedToWishList: isAddedResults[index] })); })];
            }
        });
    });
}
var handPicked = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsWithIsAdded, categoryName, page, pageSize, category, handPickedProducts, _i, handPickedProducts_1, product, ratingCount, count, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 10, , 11]);
                productsWithIsAdded = [];
                categoryName = req.query.category;
                page = Number(req.query.page) || 1;
                pageSize = Number(req.query.pageSize) || 9;
                return [4 /*yield*/, modelsRelations_1.categoryModel.findOne({
                        attributes: ['categoryID'],
                        where: {
                            name: categoryName
                        }
                    })];
            case 1:
                category = _c.sent();
                if (!category) return [3 /*break*/, 8];
                return [4 /*yield*/, modelsRelations_1.productModel.findAll({
                        attributes: [
                            "productID",
                            "title",
                            "subTitle",
                            "price",
                            "discount",
                            [db_1.sequelize.fn('COALESCE', db_1.sequelize.fn('AVG', db_1.sequelize.col("ratings.rating")), 0), 'avgRating'],
                            [db_1.sequelize.fn('COUNT', db_1.sequelize.col("ratings.rating")), 'ratingCount'],
                            [db_1.sequelize.literal('(SELECT imgPath FROM images WHERE images.productID = products.productID AND images.position = 1 LIMIT 1)'), 'imgPath'], // to make the response
                        ],
                        include: [
                            {
                                model: modelsRelations_1.ratingModel,
                                attributes: [],
                                as: "ratings",
                                where: { rating: (_a = {}, _a[sequelize_1.Op.gt] = 4.5, _a) },
                                required: false
                            },
                            {
                                model: modelsRelations_1.categoryModel,
                                attributes: [],
                                where: {
                                    categoryID: category.categoryID,
                                }
                            },
                            {
                                model: modelsRelations_1.imageModel,
                                attributes: [],
                                where: db_1.sequelize.literal('position = 1'),
                                required: false
                            }
                        ],
                        where: {
                            price: (_b = {}, _b[sequelize_1.Op.lt] = 100, _b),
                        },
                        group: ['productID'],
                        offset: (page - 1) * pageSize,
                        limit: pageSize,
                        order: [[db_1.sequelize.literal('avgRating'), 'DESC']],
                        subQuery: false
                    })];
            case 2:
                handPickedProducts = _c.sent();
                _i = 0, handPickedProducts_1 = handPickedProducts;
                _c.label = 3;
            case 3:
                if (!(_i < handPickedProducts_1.length)) return [3 /*break*/, 6];
                product = handPickedProducts_1[_i];
                return [4 /*yield*/, modelsRelations_1.ratingModel.count({
                        where: {
                            productID: product.productID,
                        },
                    })];
            case 4:
                ratingCount = _c.sent();
                _c.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                count = handPickedProducts.length;
                return [4 /*yield*/, getProductsAndIsAdded(req, handPickedProducts)];
            case 7:
                productsWithIsAdded = _c.sent();
                return [2 /*return*/, res.status(200).json({
                        "totalCount": count,
                        "products": productsWithIsAdded,
                    })];
            case 8: return [2 /*return*/, res.status(404).json('No Products Found')];
            case 9: return [3 /*break*/, 11];
            case 10:
                error_3 = _c.sent();
                res.status(500).json('Internal Server Error');
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.handPicked = handPicked;
var getSpecificProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productid, Product, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productid = req.params.productID;
                if (!productid) {
                    res.status(400).json({ error: 'productid are required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, modelsRelations_1.productModel.findOne({
                        attributes: [
                            "productID",
                            "title",
                            "subTitle",
                            "description",
                            "price",
                            "discount",
                        ],
                        include: [
                            {
                                model: modelsRelations_1.imageModel,
                                attributes: ['imageID', 'imgPath', 'position'],
                                required: false
                            },
                            {
                                model: modelsRelations_1.ratingModel,
                                attributes: [], as: "ratings",
                                required: false
                            }
                        ],
                        where: {
                            productID: productid
                        },
                        group: ['productID', 'imageID'],
                        subQuery: false
                    })];
            case 1:
                Product = _a.sent();
                return [2 /*return*/, res.status(200).json({ Product: Product })];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json('Internal Server Error')];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSpecificProduct = getSpecificProduct;
var rateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rate, productID, userID, existRate, newRating, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                rate = req.body.rating;
                productID = req.params.productID;
                userID = req.user.userID;
                // Validate input
                if (!userID || !rate || !productID) {
                    return [2 /*return*/, res.status(400).json({ error: 'Invalid input' })];
                }
                return [4 /*yield*/, modelsRelations_1.ratingModel.findOne({
                        where: {
                            userID: userID,
                            productID: productID,
                        },
                    })];
            case 1:
                existRate = _a.sent();
                if (!!existRate) return [3 /*break*/, 3];
                return [4 /*yield*/, modelsRelations_1.ratingModel.create({
                        userID: userID,
                        rating: rate,
                        productID: productID,
                    })];
            case 2:
                newRating = _a.sent();
                return [2 /*return*/, res.status(200).json("Rated Successfully")];
            case 3: return [2 /*return*/, res.status(400).json('Already Rated')];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json('Internal Server Error')];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.rateProduct = rateProduct;
var getRateAndReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productID, page, pageSize, count, reviews, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                productID = req.params.productID;
                page = Number(req.query.page) || 1;
                pageSize = Number(req.query.pageSize) || 9;
                return [4 /*yield*/, modelsRelations_1.ratingModel.count({
                        where: {
                            productID: productID,
                        },
                    })];
            case 1:
                count = _a.sent();
                return [4 /*yield*/, modelsRelations_1.ratingModel.findAll({
                        attributes: ['rating'],
                        where: {
                            productID: productID,
                        },
                        include: [{
                                model: modelsRelations_1.userModel,
                                attributes: ['firstName', 'lastName'],
                            }
                        ],
                        order: [["rating", "DESC"]],
                    })];
            case 2:
                reviews = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        "totalCount": count,
                        "reviews": reviews
                    })];
            case 3:
                error_6 = _a.sent();
                console.error(error_6);
                return [2 /*return*/, res.status(500).json('Internal Server Error')];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getRateAndReview = getRateAndReview;
