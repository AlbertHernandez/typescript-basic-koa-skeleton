import * as Awilix from "awilix";
import { FortuneTellerPredictObtainer } from "../../../../contexts/fortune-teller/predict/application/create/fortune-teller-predict-obtainer";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    fortuneTellerPredictObtainer: Awilix.asClass(FortuneTellerPredictObtainer),
  });
};
