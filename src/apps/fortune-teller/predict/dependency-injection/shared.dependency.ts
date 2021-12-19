import * as Awilix from "awilix";
import { PinoLogger } from "../../../../contexts/shared/infrastructure/pino-logger";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    logger: Awilix.asClass(PinoLogger).inject(() => {
      return {
        level: "info",
      };
    }),
  });
};
