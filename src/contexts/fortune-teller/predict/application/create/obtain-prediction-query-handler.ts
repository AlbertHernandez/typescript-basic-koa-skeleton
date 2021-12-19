import { QueryHandler } from "../../../../shared/domain/query-handler";
import { ObtainPredictionQuery } from "./obtain-prediction-query";
import { ObtainPredictionResponse } from "./obtain-prediction-response";
import { FortuneTellerPredictObtainer } from "./fortune-teller-predict-obtainer";
import { Query } from "../../../../shared/domain/query";

export class ObtainPredictionQueryHandler
  implements QueryHandler<ObtainPredictionQuery, ObtainPredictionResponse>
{
  private readonly fortuneTellerPredictObtainer;

  constructor(dependencies: {
    fortuneTellerPredictObtainer: FortuneTellerPredictObtainer;
  }) {
    this.fortuneTellerPredictObtainer =
      dependencies.fortuneTellerPredictObtainer;
  }

  subscribedTo(): Query {
    return ObtainPredictionQuery;
  }

  async handle(): Promise<ObtainPredictionResponse> {
    return await this.fortuneTellerPredictObtainer.run();
  }
}
