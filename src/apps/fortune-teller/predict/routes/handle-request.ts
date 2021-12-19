import Koa from "koa";
import * as Awilix from "awilix";
import { Controller } from "../controllers/controller";

export const handleRequest =
  (controllerName: string) => async (ctx: Koa.Context) => {
    const scopedContainer: Awilix.AwilixContainer = ctx.state.container;
    const controller = scopedContainer.resolve<Controller>(controllerName);
    await controller.run(ctx);
  };
