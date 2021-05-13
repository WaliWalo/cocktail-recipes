import { ICustomUser } from "../../controllers/oauth";
// import { Express } from "express-serve-static-core";
declare global {
  declare module "express" {
    export interface Request {
      user?: { _id?: string };
    }
  }
}
