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
exports.fillTables = void 0;
var faker_1 = require("@faker-js/faker");
var modelsRelations_1 = require("../models/modelsRelations");
var uuidv4 = require('uuid').v4;
var generateRandomData = function () {
    var randomCategory = function () { return ({
        name: faker_1.faker.commerce.productName(),
    }); };
    var randombrand = function () { return ({
        name: faker_1.faker.person.firstName(),
    }); };
    var randomUser = function () { return ({
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(), // Use faker.internet.password() for generating random passwords
        mobile: faker_1.faker.phone.number(), // Use faker.phone.phoneNumber() for generating random phone numbers
        image: faker_1.faker.image.avatar(), // Use faker.image.avatar() for generating a random avatar image URL
    }); };
    var randomSession = function (userID) { return ({
        sessionID: uuidv4(), // Using uuid to generate a unique session ID
        userID: userID,
    }); };
    var randomProduct = function (brandID, categoryID) { return ({
        title: faker_1.faker.commerce.productName(),
        subTitle: faker_1.faker.lorem.words(),
        description: faker_1.faker.lorem.paragraph(),
        price: faker_1.faker.number.float(),
        quantity: faker_1.faker.number.float(),
        categoryID: categoryID,
        discount: faker_1.faker.number.float(),
        arrivalDate: faker_1.faker.date.future().toISOString().split('T')[0], // Random future date as string in YYYY-MM-DD format
        brandID: brandID,
    }); };
    var orderStates = ['completed', 'processing', 'cancel'];
    var randomState = orderStates[Math.floor(Math.random() * orderStates.length)];
    var randomOrder = function (userID, addressID, orderID) { return ({
        orderID: orderID,
        userID: userID,
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        mobile: faker_1.faker.phone.number(),
        addressID: addressID,
        state: "completed",
        isPaid: faker_1.faker.number.binary(),
        date: faker_1.faker.date.future().toISOString().split('T')[0],
        paymentMethod: faker_1.faker.finance.transactionType(),
        grandTotal: faker_1.faker.number.float(),
    }); };
    return {
        randomCategory: randomCategory,
        randombrand: randombrand,
        randomUser: randomUser,
        randomSession: randomSession,
        randomProduct: randomProduct,
        randomOrder: randomOrder,
    };
};
var fillTables = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, randomCategory, randombrand, randomUser, randomSession, randomProduct, randomOrder, i, Category, addedCategory, insertedCategories, i, brand, addedbrand, insertedbrands, i, user, addedUser, insertedbrands, i, userID, session, addedSession, insertedSession, i, brandID, categoryID, product, addedProduct, insertedSession, i, userID, addressID, orderID, order, addedOrder, insertedOrder, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 31, , 32]);
                _a = generateRandomData(), randomCategory = _a.randomCategory, randombrand = _a.randombrand, randomUser = _a.randomUser, randomSession = _a.randomSession, randomProduct = _a.randomProduct, randomOrder = _a.randomOrder;
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < 5)) return [3 /*break*/, 5];
                Category = randomCategory();
                return [4 /*yield*/, modelsRelations_1.categoryModel.create(Category)];
            case 2:
                addedCategory = _b.sent();
                if (!addedCategory) return [3 /*break*/, 4];
                return [4 /*yield*/, modelsRelations_1.categoryModel.findAll({
                        attributes: ['name'], // Specify the attributes you want to retrieve, or leave it empty for all attributes
                    })];
            case 3:
                insertedCategories = _b.sent();
                _b.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5:
                i = 0;
                _b.label = 6;
            case 6:
                if (!(i < 5)) return [3 /*break*/, 10];
                brand = randombrand();
                return [4 /*yield*/, modelsRelations_1.brandModel.create(brand)];
            case 7:
                addedbrand = _b.sent();
                if (!addedbrand) return [3 /*break*/, 9];
                return [4 /*yield*/, modelsRelations_1.brandModel.findAll({
                        attributes: ['name'], // Specify the attributes you want to retrieve, or leave it empty for all attributes
                    })];
            case 8:
                insertedbrands = _b.sent();
                _b.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 6];
            case 10:
                i = 0;
                _b.label = 11;
            case 11:
                if (!(i < 10)) return [3 /*break*/, 15];
                user = randomUser();
                return [4 /*yield*/, modelsRelations_1.userModel.create(user)];
            case 12:
                addedUser = _b.sent();
                if (!addedUser) return [3 /*break*/, 14];
                return [4 /*yield*/, modelsRelations_1.userModel.findAll({
                        attributes: ['firstName', 'lastName'],
                    })];
            case 13:
                insertedbrands = _b.sent();
                _b.label = 14;
            case 14:
                i++;
                return [3 /*break*/, 11];
            case 15:
                i = 0;
                _b.label = 16;
            case 16:
                if (!(i < 10)) return [3 /*break*/, 20];
                userID = faker_1.faker.number.int({ min: 1, max: 100 });
                session = randomSession(userID);
                return [4 /*yield*/, modelsRelations_1.sessionModel.create(session)];
            case 17:
                addedSession = _b.sent();
                if (!addedSession) return [3 /*break*/, 19];
                return [4 /*yield*/, modelsRelations_1.sessionModel.findAll({
                        attributes: ['sessionID'],
                    })];
            case 18:
                insertedSession = _b.sent();
                console.log("Inserted session:", insertedSession.map(function (sessions) { return sessions.sessionID; }).join(', '));
                _b.label = 19;
            case 19:
                i++;
                return [3 /*break*/, 16];
            case 20:
                i = 0;
                _b.label = 21;
            case 21:
                if (!(i < 10)) return [3 /*break*/, 25];
                brandID = faker_1.faker.number.int({ min: 1, max: 2 });
                categoryID = faker_1.faker.number.int({ min: 1, max: 2 });
                product = randomProduct(brandID, categoryID);
                return [4 /*yield*/, modelsRelations_1.productModel.create(product)];
            case 22:
                addedProduct = _b.sent();
                if (!addedProduct) return [3 /*break*/, 24];
                return [4 /*yield*/, modelsRelations_1.productModel.findAll({
                        attributes: ['title'],
                    })];
            case 23:
                insertedSession = _b.sent();
                console.log("Inserted product:", insertedSession.map(function (product) { return product.title; }).join(', '));
                _b.label = 24;
            case 24:
                i++;
                return [3 /*break*/, 21];
            case 25:
                i = 0;
                _b.label = 26;
            case 26:
                if (!(i < 20)) return [3 /*break*/, 30];
                userID = faker_1.faker.number.int({ min: 1, max: 10 });
                addressID = faker_1.faker.number.int({ min: 1, max: 10 });
                orderID = faker_1.faker.number.int({ min: 1, max: 10 });
                order = randomOrder(userID, addressID, orderID);
                return [4 /*yield*/, modelsRelations_1.orderModel.create(order)];
            case 27:
                addedOrder = _b.sent();
                if (!addedOrder) return [3 /*break*/, 29];
                return [4 /*yield*/, modelsRelations_1.orderModel.findAll({
                        attributes: ['firstName'],
                    })];
            case 28:
                insertedOrder = _b.sent();
                _b.label = 29;
            case 29:
                i++;
                return [3 /*break*/, 26];
            case 30:
                console.log("Faker inserted data successfully!");
                return [3 /*break*/, 32];
            case 31:
                error_1 = _b.sent();
                console.error(" Error inserting to table:", error_1.message);
                return [3 /*break*/, 32];
            case 32: return [2 /*return*/];
        }
    });
}); };
exports.fillTables = fillTables;
