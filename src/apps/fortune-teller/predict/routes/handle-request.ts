import Koa from "koa";
import * as Awilix from "awilix";

export const handleRequest =
  (controllerName: string) => async (ctx: Koa.Context) => {
    const scopedContainer: Awilix.AwilixContainer = ctx.state.container;
    const controller = scopedContainer.resolve(controllerName);
    await controller.run(ctx);
  };
