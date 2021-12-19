import Router from "koa-router";
import { Controller } from "../controllers/controller";
import { container } from "../dependency-injection";

export const register = (router: Router) => {
  const controller = container.resolve<Controller>("statusGetController");
  router.get("/health", controller.run.bind(controller));
};
