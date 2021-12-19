import { Controller } from "./controller";
import Koa from "koa";
import { FortuneTellerPredictObtainer } from "../../../../contexts/fortune-teller/predict/application/create/fortune-teller-predict-obtainer";

export default class PredictionGetController implements Controller {
  private readonly fortuneTellerPredictObtainer: FortuneTellerPredictObtainer;

  constructor(dependencies: {
    fortuneTellerPredictObtainer: FortuneTellerPredictObtainer;
  }) {
    this.fortuneTellerPredictObtainer =
      dependencies.fortuneTellerPredictObtainer;
  }

  async run(ctx: Koa.Context) {
    const prediction = await this.fortuneTellerPredictObtainer.run();
    ctx.body = prediction;
  }
}
