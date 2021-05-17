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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var axios_1 = __importDefault(require("axios"));
var ErrorHandler_1 = __importDefault(require("./../models/ErrorHandler"));
var UserModel_1 = require("./../models/UserModel");
var cocktailController = /** @class */ (function () {
    function cocktailController() {
    }
    cocktailController.prototype.defaultMethod = function () {
        throw new ErrorHandler_1.default(501, "Not implemented method");
    };
    cocktailController.prototype.getRandomCocktails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var drinks, i, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        drinks = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 5)) return [3 /*break*/, 4];
                        return [4 /*yield*/, axios_1.default.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")];
                    case 2:
                        response = _a.sent();
                        if (response.statusText === "OK") {
                            drinks.push(response.data.drinks[0]);
                        }
                        else {
                            throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, drinks];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    cocktailController.prototype.getFilteredCocktails = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString, _i, _a, _b, key, value, url, response, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        queryString = "";
                        for (_i = 0, _a = Object.entries(query); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], value = _b[1];
                            queryString = queryString.concat("&", key + "=" + value);
                        }
                        url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?" + queryString.slice(1, queryString.length);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 1:
                        response = _c.sent();
                        if (response.statusText === "OK") {
                            if (response.data.drinks) {
                                return [2 /*return*/, response.data.drinks];
                            }
                            else {
                                throw new ErrorHandler_1.default(404, "No drinks found");
                            }
                        }
                        else {
                            throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        return [2 /*return*/, error_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    cocktailController.prototype.getCocktailById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)];
                    case 1:
                        response = _a.sent();
                        if (response.statusText === "OK") {
                            if (response.data.drinks) {
                                return [2 /*return*/, response.data];
                            }
                            else {
                                throw new ErrorHandler_1.default(404, "Drink not found");
                            }
                        }
                        else {
                            throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    cocktailController.prototype.getList = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?" + query + "=list")];
                    case 1:
                        response = _a.sent();
                        if (response.statusText === "OK") {
                            if (response.data) {
                                return [2 /*return*/, response.data.drinks];
                            }
                            else {
                                throw new ErrorHandler_1.default(404, "List not found");
                            }
                        }
                        else {
                            throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, error_4];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    cocktailController.prototype.getIngredientDetails = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=" + id)];
                    case 1:
                        response = _a.sent();
                        if (response.statusText === "OK") {
                            if (response.data.ingredients) {
                                return [2 /*return*/, response.data];
                            }
                            else {
                                throw new ErrorHandler_1.default(404, "Ingredient not found");
                            }
                        }
                        else {
                            throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, error_5];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    cocktailController.prototype.getCocktailByName = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + query)];
                    case 1:
                        response = _a.sent();
                        if (response.statusText === "OK") {
                            if (response.data.drinks) {
                                return [2 /*return*/, response.data];
                            }
                            else {
                                throw new ErrorHandler_1.default(404, "Drink not found");
                            }
                        }
                        else {
                            throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, error_6];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    cocktailController.prototype.addFavCocktail = function (userId, cocktailId) {
        return __awaiter(this, void 0, void 0, function () {
            var cocktail, user, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.getCocktailById(cocktailId)];
                    case 1:
                        cocktail = _a.sent();
                        if (!(cocktail.statusCode !== 404)) return [3 /*break*/, 3];
                        return [4 /*yield*/, UserModel_1.User.findOneAndUpdate({ _id: userId }, { $addToSet: { favs: cocktailId } }, { new: true, useFindAndModify: false })];
                    case 2:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, user];
                        }
                        else {
                            throw new ErrorHandler_1.default(404, "User not found");
                        }
                        return [3 /*break*/, 4];
                    case 3: throw new ErrorHandler_1.default(404, "Cocktail not found");
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_7 = _a.sent();
                        if (error_7.reason) {
                            throw new ErrorHandler_1.default(404, "User not found");
                        }
                        else
                            return [2 /*return*/, error_7];
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    cocktailController.prototype.removeCocktailFromFav = function (userId, cocktailId) {
        return __awaiter(this, void 0, void 0, function () {
            var cocktail, user, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.getCocktailById(cocktailId)];
                    case 1:
                        cocktail = _a.sent();
                        if (!(cocktail.statusCode !== 404)) return [3 /*break*/, 3];
                        return [4 /*yield*/, UserModel_1.User.findOneAndUpdate({ _id: userId }, { $pull: { favs: cocktailId } }, { new: true, useFindAndModify: false })];
                    case 2:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, user];
                        }
                        else {
                            throw new ErrorHandler_1.default(404, "User not found");
                        }
                        return [3 /*break*/, 4];
                    case 3: throw new ErrorHandler_1.default(404, "Cocktail not found");
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_8 = _a.sent();
                        if (error_8.reason) {
                            throw new ErrorHandler_1.default(404, "User not found");
                        }
                        else
                            return [2 /*return*/, error_8];
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return cocktailController;
}());
module.exports = new cocktailController();
