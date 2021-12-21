import Router from "koa-router";
import { handleRequest } from "./handle-request";
import PredictionGetController from "../controllers/prediction-get.controller";
import { authorization } from "../middlewares/authorization.middleware";
import { UserType } from "../models/api-user";

export const register = (router: Router) => {
  router.get(
    "/fortune-teller/predict",
    authorization({ allowedUserTypes: [UserType.Api] }),
    handleRequest(PredictionGetController)
  );
};
