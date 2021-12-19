import * as Awilix from "awilix";
import { PinoLogger } from "../../../../contexts/shared/infrastructure/pino-logger";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";
import { config } from "../../../../contexts/fortune-teller/shared/infrastructure/config";
import { InMemoryQueryBus } from "../../../../contexts/shared/infrastructure/query-bus/in-memory-query-bus";
import { QueryHandlersInformation } from "../../../../contexts/shared/infrastructure/query-bus/query-handlers-information";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    logger: Awilix.asClass(PinoLogger).inject(() => {
      return {
        level: config.get("logger.level"),
        isEnabled: config.get("logger.isEnabled"),
      };
    }),
    errorHandler: Awilix.asClass(ErrorHandler),
    queryHandlers: Awilix.asFunction(
      ({ parentContainer }: { parentContainer: Awilix.AwilixContainer }) =>
        Object.keys(parentContainer.registrations)
          .filter((dependencyName: string) => {
            return dependencyName.includes("QueryHandler");
          })
          .map((dependencyName) => {
            return parentContainer.resolve(dependencyName);
          })
    ).inject((parentContainer: Awilix.AwilixContainer) => ({
      parentContainer,
    })),
    queryHandlersInformation: Awilix.asClass(QueryHandlersInformation),
    queryBus: Awilix.asClass(InMemoryQueryBus),
  });
};
