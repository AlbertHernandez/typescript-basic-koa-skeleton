import { Logger } from "../../../../shared/domain/logger";
import { ObtainPredictionResponse } from "./obtain-prediction-response";

export class FortuneTellerPredictObtainer {
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  async run() {
    this.logger.info("FortuneTellerPredictObtainer");
    return new ObtainPredictionResponse("This is a prediction");
  }
}
