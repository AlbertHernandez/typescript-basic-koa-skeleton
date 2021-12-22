import * as Awilix from "awilix";
import { FortuneTellerPredictObtainer } from "../../../../contexts/fortune-teller/predict/application/create/fortune-teller-predict-obtainer";
import { ObtainPredictionQueryHandler } from "../../../../contexts/fortune-teller/predict/application/create/obtain-prediction-query-handler";
import { ObtainAnswerQueryHandler } from "../../../../contexts/fortune-teller/predict/application/get-answer/obtain-answer-query-handler";
import { FortuneTellerAnswerObtainer } from "../../../../contexts/fortune-teller/predict/application/get-answer/fortune-teller-answer-obtainer";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    fortuneTellerPredictObtainer: Awilix.asClass(FortuneTellerPredictObtainer),
    obtainPredictionQueryHandler: Awilix.asClass(ObtainPredictionQueryHandler),
    obtainAnswerQueryHandler: Awilix.asClass(ObtainAnswerQueryHandler),
    fortuneTellerAnswerObtainer: Awilix.asClass(FortuneTellerAnswerObtainer),
  });
};
