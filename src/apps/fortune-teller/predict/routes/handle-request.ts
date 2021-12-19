import Koa from "koa";
import * as Awilix from "awilix";
import { Controller } from "../controllers/controller";
import { Class } from "../../../../contexts/shared/domain/class";

export const handleRequest =
  (controller: Class<Controller>) => async (ctx: Koa.Context) => {
    const controllerName = controller.name;
    const scopedContainer: Awilix.AwilixContainer = ctx.state.container;
    const instance = scopedContainer.resolve<Controller>(controllerName);
    await instance.run(ctx);
  };
