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
var express_1 = require("express");
var passport = require("passport");
var authController_1 = __importDefault(require("../../controllers/authController"));
var authenticate = require("../../controllers/authTools").authenticate;
var authRouter = /** @class */ (function () {
    function authRouter() {
        this._router = express_1.Router();
        this._controller = authController_1.default;
        this._configure();
    }
    Object.defineProperty(authRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Connect routes to their matching controller endpoints.
     */
    authRouter.prototype._configure = function () {
        var _this = this;
        this._router.post("/login", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var result, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this._controller.login(req.body)];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        return [4 /*yield*/, authenticate(result)];
                    case 2:
                        token = _a.sent();
                        res
                            .status(201)
                            .cookie("accessToken", token.token, {
                            httpOnly: true,
                        })
                            .send(result);
                        return [3 /*break*/, 4];
                    case 3:
                        res
                            .status(201)
                            .send({ status: "Error", message: "Wrong Email/Password" });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        this._router.post("/logout", function (req, res, next) {
            res.clearCookie("accessToken");
            res.send({ status: "ok", message: "Logged Out" });
        });
        this._router.get("/googleLogin", passport.authenticate("google", { scope: ["profile", "email"] }), function (req, res, next) { });
        this._router.get("/facebookLogin", passport.authenticate("facebook", {
            scope: "email",
        }), function (req, res, next) { });
        this._router.get("/googleRedirect", passport.authenticate("google"), function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, authenticate(req.user)];
                    case 1:
                        token = (_a.sent()).token;
                        req.user !== undefined &&
                            res
                                .status(200)
                                .cookie("accessToken", token, {
                                httpOnly: true,
                            })
                                .redirect(process.env.REACT_APP_FE_URL + "/?userId=" + req.user._id);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this._router.get("/facebookRedirect", passport.authenticate("facebook", { failureRedirect: "/" }), function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, authenticate(req.user)];
                    case 1:
                        token = (_a.sent()).token;
                        req.user !== undefined &&
                            res
                                .status(200)
                                .cookie("accessToken", token, {
                                httpOnly: true,
                            })
                                .redirect(process.env.REACT_APP_FE_URL + "/?userId=" + req.user._id);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return authRouter;
}());
module.exports = new authRouter().router;
