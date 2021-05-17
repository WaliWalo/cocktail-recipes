"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var MasterRouter_1 = __importDefault(require("./routes/MasterRouter"));
var listEndpoints = require("express-list-endpoints");
var cors = require("cors");
var oauth = require("./controllers/oauth");
var passport = require("passport");
var cookieParser = require("cookie-parser");
// load the environment variables from the .env file
dotenv_1.default.config({
    path: ".env",
});
var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //to allow cookies
};
/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.router = MasterRouter_1.default;
    }
    return Server;
}());
// initialize server app
var server = new Server();
server.app.use(cors(corsOptions));
server.app.use(express_1.default.json());
server.app.use(cookieParser());
server.app.use(passport.initialize());
server.app.use("/api", server.router);
server.app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500).json({
        status: "error",
        statusCode: err.statusCode,
        message: err.message,
    });
});
console.log(listEndpoints(server.app));
// make server listen on some port
var mongoConnectionStr = process.env.MONGO_CONNECTION ||
    "Something wrong with mongo connection string";
var port = process.env.APP_PORT || 5000;
mongoose_1.default
    .connect(mongoConnectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    server.app.listen(port, function () {
        console.log("Running on port", port);
    });
})
    .catch(function (err) { return console.log(err); });
