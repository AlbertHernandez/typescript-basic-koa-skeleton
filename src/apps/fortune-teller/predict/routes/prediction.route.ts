import Router from "koa-router";
import { container } from "../dependency-injection";
import { Controller } from "../controllers/controller";

export const register = (router: Router) => {
  const controller = container.resolve<Controller>("predictionGetController");
  router.get("/fortune-teller/predict", controller.run.bind(controller));
};
