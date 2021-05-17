"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = require("express");
var authRouter_1 = __importDefault(require("./authRoutes/authRouter"));
var cocktailRouter_1 = __importDefault(require("./cocktailRoutes/cocktailRouter"));
var userRouter_1 = __importDefault(require("./userRoutes/userRouter"));
var MasterRouter = /** @class */ (function () {
    function MasterRouter() {
        this._router = express_1.Router();
        this._subrouterA = userRouter_1.default;
        this._subrouterB = cocktailRouter_1.default;
        this._subrouterC = authRouter_1.default;
        this._configure();
    }
    Object.defineProperty(MasterRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Connect routes to their matching routers.
     */
    MasterRouter.prototype._configure = function () {
        this._router.use("/users", this._subrouterA);
        this._router.use("/cocktails", this._subrouterB);
        this._router.use("/auth", this._subrouterC);
    };
    return MasterRouter;
}());
module.exports = new MasterRouter().router;
