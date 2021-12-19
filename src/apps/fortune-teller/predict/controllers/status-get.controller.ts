import { Controller } from "./controller";
import Koa from "koa";
import httpStatus from "http-status";

export default class StatusGetController implements Controller {
  async run(ctx: Koa.Context) {
    ctx.status = httpStatus.OK;
  }
}
