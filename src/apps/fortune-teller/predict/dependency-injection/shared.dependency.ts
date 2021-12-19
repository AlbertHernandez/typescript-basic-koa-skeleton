import * as Awilix from "awilix";
import { PinoLogger } from "../../../../contexts/shared/infrastructure/pino-logger";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";
import { config } from "../../../../contexts/fortune-teller/shared/infrastructure/config";
import { InMemoryQueryBus } from "../../../../contexts/shared/infrastructure/query-bus/in-memory-query-bus";
import { QueryHandlersInformation } from "../../../../contexts/shared/infrastructure/query-bus/query-handlers-information";
import { QueryHandler } from "../../../../contexts/shared/domain/query-handler";
import { Query } from "../../../../contexts/shared/domain/query";
import { Response } from "../../../../contexts/shared/domain/response";
import { ObtainPredictionQueryHandler } from "../../../../contexts/fortune-teller/predict/application/create/obtain-prediction-query-handler";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    logger: Awilix.asClass(PinoLogger).inject(() => {
      return {
        level: config.get("logger.level"),
        isEnabled: config.get("logger.isEnabled"),
      };
    }),
    errorHandler: Awilix.asClass(ErrorHandler),
    queryHandlersInformation: Awilix.asClass(QueryHandlersInformation).inject(
      (parentContainer: Awilix.AwilixContainer) => {
        const queryHandlers: QueryHandler<Query, Response>[] = [];

        const obtainPredictionQueryHandler =
          parentContainer.resolve<ObtainPredictionQueryHandler>(
            "obtainPredictionQueryHandler"
          );

        queryHandlers.push(obtainPredictionQueryHandler);

        return {
          queryHandlers,
        };
      }
    ),
    queryBus: Awilix.asClass(InMemoryQueryBus),
  });
};
