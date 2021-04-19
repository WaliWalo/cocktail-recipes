import { NextFunction, Request, Response, Router } from "express";
import userController from "../../controllers/userController";

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
    this._router.get("/", (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = this._controller.getUsersMethod();
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    });

    this._router.get(
      "/:id",
      (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = this._controller.getUsersByIdMethod("rew");
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
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new userRouter().router;
