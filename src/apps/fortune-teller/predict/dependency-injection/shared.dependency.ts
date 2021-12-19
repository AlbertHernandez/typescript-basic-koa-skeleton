import * as Awilix from "awilix";
import { PinoLogger } from "../../../../contexts/shared/infrastructure/pino-logger";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    logger: Awilix.asClass(PinoLogger).inject(() => {
      return {
        level: "info",
      };
    }),
    errorHandler: Awilix.asClass(ErrorHandler),
  });
};
