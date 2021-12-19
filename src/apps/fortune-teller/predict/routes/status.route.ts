import Router from "koa-router";
import { handleRequest } from "./handle-request";

export const register = (router: Router) => {
  router.get("/health", handleRequest("statusGetController"));
};
