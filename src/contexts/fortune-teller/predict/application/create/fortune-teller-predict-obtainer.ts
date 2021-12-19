import { Logger } from "../../../../shared/domain/logger";

export class FortuneTellerPredictObtainer {
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  async run() {
    this.logger.info("FortuneTellerPredictObtainer");
    return "This is a prediction";
  }
}
