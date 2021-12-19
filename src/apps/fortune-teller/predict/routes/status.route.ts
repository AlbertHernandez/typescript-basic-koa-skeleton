import Router from "koa-router";
import { handleRequest } from "./handle-request";
import StatusGetController from "../controllers/status-get.controller";

export const register = (router: Router) => {
  router.get("/health", handleRequest(StatusGetController.name));
};
