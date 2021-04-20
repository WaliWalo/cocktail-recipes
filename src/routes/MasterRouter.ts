import { Router } from "express";
import authRouter from "./authRoutes/authRouter";
import cocktailRouter from "./cocktailRoutes/cocktailRouter";
import userRouter from "./userRoutes/userRouter";

class MasterRouter {
  private _router = Router();
  private _subrouterA = userRouter;
  private _subrouterB = cocktailRouter;
  private _subrouterC = authRouter;

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
    this._router.use("/cocktails", this._subrouterB);
    this._router.use("/auth", this._subrouterC);
  }
}

export = new MasterRouter().router;
