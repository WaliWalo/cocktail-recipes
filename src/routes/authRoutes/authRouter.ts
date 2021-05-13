import { NextFunction, Request, Response, Router } from "express";
const passport = require("passport");
import authController from "../../controllers/authController";
const { authenticate } = require("../../controllers/authTools");
interface AuthRequest extends Request {
  user?: { _id?: string };
}
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

    this._router.get(
      "/googleLogin",
      passport.authenticate("google", { scope: ["profile", "email"] }),
      (req: Request, res: Response, next: NextFunction) => {}
    );

    this._router.get(
      "/facebookLogin",
      passport.authenticate("facebook", {
        scope: "email",
      }),
      (req: Request, res: Response, next: NextFunction) => {}
    );

    this._router.get(
      "/googleRedirect",
      passport.authenticate("google"),
      async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
          const { token } = await authenticate(req.user);
          req.user !== undefined &&
            res
              .status(200)
              .cookie("accessToken", token, {
                httpOnly: true,
              })
              .redirect(
                `${process.env.REACT_APP_FE_URL}/?userId=${req.user._id}`
              );
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.get(
      "/facebookRedirect",
      passport.authenticate("facebook", { failureRedirect: "/" }),
      async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
          const { token } = await authenticate(req.user);
          req.user !== undefined &&
            res
              .status(200)
              .cookie("accessToken", token, {
                httpOnly: true,
              })
              .redirect(
                `${process.env.REACT_APP_FE_URL}/?userId=${req.user._id}`
              );

          // {
          //   secure: true,
          //   sameSite: "none",
          //   httpOnly: true,
          // }
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new authRouter().router;
