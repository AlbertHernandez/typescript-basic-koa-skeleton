import Koa from "koa";
import * as Awilix from "awilix";
import { Logger } from "../../../../contexts/shared/domain/logger";

export const scopeLoggerPerRequest = async (
  ctx: Koa.Context,
  next: Koa.Next
) => {
  const scopedContainer: Awilix.AwilixContainer = ctx.state.container;
  const logger = scopedContainer.resolve<Logger>("logger");
  const requestId = ctx.state.id;

  const scopedLogger = logger.child({
    requestId,
  });

  scopedContainer.register({
    logger: Awilix.asValue(scopedLogger),
  });

  await next();
};
