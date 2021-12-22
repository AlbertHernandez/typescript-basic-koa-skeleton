import Router from "koa-router";
import { handleRequest } from "./handle-request";
import PredictionGetController from "../controllers/prediction-get.controller";
import { authorization } from "../middlewares/authorization.middleware";
import { UserType } from "../models/api-user";
import AnswerGetController from "../controllers/answer-get.controller";
import { schemaValidationMiddleware } from "../middlewares/schema-validation.middleware";

export const register = (router: Router) => {
  router.get(
    "/fortune-teller/predict",
    authorization({ allowedUserTypes: [UserType.Api] }),
    handleRequest(PredictionGetController)
  );
  router.get(
    "/fortune-teller/answer",
    authorization({ allowedUserTypes: [UserType.Api] }),
    schemaValidationMiddleware(AnswerGetController.schema()),
    handleRequest(AnswerGetController)
  );
};
