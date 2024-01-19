"use strict";
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
exports.moveToWishlist = exports.updateProductQuantityInCart = exports.getCart = void 0;
var modelsRelations_1 = require("../models/modelsRelations");
var QueryTypes = require('sequelize').QueryTypes;
var getCart = function getCartContent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, cartContent, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userID = req.user.userID;
                    return [4 /*yield*/, modelsRelations_1.cartModel.findAll({
                            attributes: [
                                "productQuantity"
                            ],
                            where: {
                                userID: userID,
                                isOrdered: false,
                            },
                            include: [
                                {
                                    model: modelsRelations_1.productModel,
                                    attributes: ["productID", "title", "subTitle", "price", "quantity", "discount"],
                                    include: [
                                        {
                                            model: modelsRelations_1.imageModel,
                                            attributes: ["imgPath"],
                                            where: { position: 1 },
                                            required: false,
                                        }
                                    ]
                                },
                            ],
                        })];
                case 1:
                    cartContent = _a.sent();
                    return [2 /*return*/, res.status(200).json(cartContent)];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [2 /*return*/, res.status(500).json('Internal Server Error')];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getCart = getCart;
var updateProductQuantityInCart = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productID, newQuantity, userID, product, cartProduct, updatedProduct, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    productID = req.params.productID;
                    newQuantity = req.body.newQuantity;
                    userID = req.user.userID;
                    if (!productID || !newQuantity) {
                        throw new Error();
                    }
                    return [4 /*yield*/, modelsRelations_1.productModel.findByPk(productID)];
                case 1:
                    product = _a.sent();
                    if (!product) {
                        return [2 /*return*/, res.status(404).json("Product does not exist")];
                    }
                    if (product.quantity < newQuantity) {
                        return [2 /*return*/, res.status(404).json("No enough quantity")];
                    }
                    return [4 /*yield*/, modelsRelations_1.cartModel.findOne({
                            where: {
                                userID: userID,
                                productID: productID,
                                isOrdered: 0,
                            },
                        })];
                case 2:
                    cartProduct = _a.sent();
                    if (!cartProduct) return [3 /*break*/, 4];
                    return [4 /*yield*/, updateProduct(cartProduct.productID, userID, newQuantity)];
                case 3:
                    updatedProduct = _a.sent();
                    return [2 /*return*/, res.status(200).json(updatedProduct)];
                case 4: return [2 /*return*/, res.status(404).json('Product not found in the user\'s cart.')];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_2 = _a.sent();
                    console.error(err_2);
                    return [2 /*return*/, res.status(500).json('Internal Server Error')];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.updateProductQuantityInCart = updateProductQuantityInCart;
var moveToWishlist = function moveToWishlist(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productID, userID, productInCart, productInWishList, removedFromCart, newWishlistProduct, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    productID = req.params.productID;
                    userID = req.user.userID;
                    if (!productID || !userID) {
                        return [2 /*return*/, res.status(400).json('All fields are required')];
                    }
                    return [4 /*yield*/, modelsRelations_1.cartModel.findOne({ where: { userID: userID, productID: productID } })];
                case 1:
                    productInCart = _a.sent();
                    if (!productInCart) return [3 /*break*/, 5];
                    return [4 /*yield*/, modelsRelations_1.wishListModel.findOne({ where: { userID: userID, productID: productID } })];
                case 2:
                    productInWishList = _a.sent();
                    if (productInWishList) {
                        return [2 /*return*/, res.status(400).json('Product Already in the wishList')];
                    }
                    return [4 /*yield*/, modelsRelations_1.cartModel.destroy({ where: { userID: userID, productID: productID } })];
                case 3:
                    removedFromCart = _a.sent();
                    if (!removedFromCart) return [3 /*break*/, 5];
                    return [4 /*yield*/, modelsRelations_1.wishListModel.create({
                            userID: userID,
                            productID: productID,
                        })];
                case 4:
                    newWishlistProduct = _a.sent();
                    return [2 /*return*/, res.status(200).json(newWishlistProduct)];
                case 5: return [2 /*return*/, res.status(400).json("Product isn't Added To the Cart")];
                case 6:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [2 /*return*/, res.status(500).json('Internal Server Error')];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.moveToWishlist = moveToWishlist;
function updateProduct(cartProductID, userID, newQuantity) {
    return __awaiter(this, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, modelsRelations_1.cartModel.update({ productQuantity: newQuantity }, {
                            where: {
                                productID: cartProductID,
                                userID: userID
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_4 = _a.sent();
                    throw err_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
