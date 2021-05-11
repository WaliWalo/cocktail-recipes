import { NextFunction, Request, Response, Router } from "express";
import authController from "../../controllers/authController";
const { authenticate } = require("../../controllers/authTools");

class authRouter {
  private _router = Router();
  private _controller = authController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private _configure() {
    this._router.post(
      "/login",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.login(req.body);

          if (result) {
            const token = await authenticate(result);

            res
              .status(201)
              .cookie("accessToken", token.token, {
                httpOnly: true,
              })
              .send(result);
          } else {
            res
              .status(201)
              .send({ status: "Error", message: "Wrong Email/Password" });
          }
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.post(
      "/logout",
      (req: Request, res: Response, next: NextFunction) => {
        res.clearCookie("accessToken");
        res.send({ status: "ok", message: "Logged Out" });
      }
    );
  }
}

export = new authRouter().router;
