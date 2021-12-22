import Koa from "koa";
import { HttpResponse } from "../models/http-response";

export interface Controller {
  run(ctx: Koa.Context): Promise<HttpResponse>;
}
