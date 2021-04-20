import { NextFunction, Request, Response, Router } from "express";
import cocktailController from "../../controllers/cocktailController";
const { authorize } = require("../../controllers/authMiddleware");

class cocktailRouter {
  private _router = Router();
  private _controller = cocktailController;

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
          const result = await this._controller.getRandomCocktails();

          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.get(
      "/filter",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.getFilteredCocktails(req.query);

          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.get(
      "/lookupCocktail/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.getCocktailById(req.params.id);

          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.get(
      "/lookupIngredient/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.getIngredientDetails(
            req.params.id
          );

          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.get(
      "/lists/:query",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.getList(req.params.query);

          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.get(
      "/search/:query",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.getCocktailByName(
            req.params.query
          );
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.put(
      "/favourite/:userId/:cocktailId",
      authorize,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.addFavCocktail(
            req.params.userId,
            req.params.cocktailId
          );

          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.delete(
      "/favourite/:userId/:cocktailId",
      authorize,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.removeCocktailFromFav(
            req.params.userId,
            req.params.cocktailId
          );

          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new cocktailRouter().router;
