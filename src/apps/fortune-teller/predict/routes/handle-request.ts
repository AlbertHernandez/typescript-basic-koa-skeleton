import Koa from "koa";
import * as Awilix from "awilix";
import { Controller } from "../controllers/controller";

type Class<T> = new (...args: any[]) => T;

export const handleRequest =
  (controller: Class<Controller>) => async (ctx: Koa.Context) => {
    const controllerName = controller.name;
    const scopedContainer: Awilix.AwilixContainer = ctx.state.container;
    const instance = scopedContainer.resolve<Controller>(controllerName);
    await instance.run(ctx);
  };
