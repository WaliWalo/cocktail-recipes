import { Router } from "express";
import userRouter from "./userRoutes/userRouter";

class MasterRouter {
  private _router = Router();
  private _subrouterA = userRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use("/users", this._subrouterA);
  }
}

export = new MasterRouter().router;
