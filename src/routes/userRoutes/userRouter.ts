import { NextFunction, Request, Response, Router } from "express";
import userController from "../../controllers/userController";
import authController from "../../controllers/authController";
const { authenticate } = require("../../controllers/authTools");

class userRouter {
  private _router = Router();
  private _controller = userController;

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
    this._router.get(
      "/",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.getUsersMethod();

          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.get(
      "/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.getUsersByIdMethod(
            req.params.id
          );
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.post(
      "/",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.postNewUser(req.body);

          if (req.body.password !== undefined) {
            const authRes = await authController.login({
              email: req.body.email,
              password: req.body.password,
            });
            if (authRes) {
              const token = await authenticate(authRes);

              res.status(201).cookie("accessToken", token.token, {
                httpOnly: true,
              });
            }
          }

          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.put(
      "/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.updateUser(
            req.params.id,
            req.body
          );
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.delete(
      "/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.deleteUser(req.params.id);
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new userRouter().router;
