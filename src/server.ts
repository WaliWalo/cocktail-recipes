import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ErrorHandler from "./models/ErrorHandler";
import MasterRouter from "./routes/MasterRouter";
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const oauth = require("./controllers/oauth");
const passport = require("passport");
const cookieParser = require("cookie-parser");
// load the environment variables from the .env file
dotenv.config({
  path: ".env",
});
const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true, //to allow cookies
};
/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = MasterRouter;
}

// initialize server app
const server = new Server();
server.app.use(cors(corsOptions));
server.app.use(express.json());
server.app.use(cookieParser());
server.app.use(passport.initialize());
server.app.use("/api", server.router);
server.app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }
);
console.log(listEndpoints(server.app));
// make server listen on some port
const mongoConnectionStr: string =
  process.env.MONGO_CONNECTION ||
  "Something wrong with mongo connection string";
const port = process.env.PORT || 5000;
mongoose
  .connect(mongoConnectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.app.listen(port, () => {
      console.log("Running on port", port);
    });
  })
  .catch((err: any) => console.log(err));
