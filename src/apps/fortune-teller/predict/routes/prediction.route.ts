import Router from "koa-router";
import { handleRequest } from "./handle-request";
import PredictionGetController from "../controllers/prediction-get.controller";

export const register = (router: Router) => {
  router.get("/fortune-teller/predict", handleRequest(PredictionGetController));
};
