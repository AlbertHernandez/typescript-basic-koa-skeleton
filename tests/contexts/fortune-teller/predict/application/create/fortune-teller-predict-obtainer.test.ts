import { FortuneTellerPredictObtainerMother } from "../../domain/fortune-teller-predict-obtainer-mother";
import { ObtainPredictionResponse } from "../../../../../../src/contexts/fortune-teller/predict/application/create/obtain-prediction-response";

describe("FortuneTellerPredictObtainer", () => {
  it("get a prediction", async () => {
    const applicationService = FortuneTellerPredictObtainerMother.create();

    const prediction = await applicationService.run();

    expect(prediction).toBeInstanceOf(ObtainPredictionResponse);
  });
});
