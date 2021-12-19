import { FortuneTellerPredictObtainer } from "../../../../../../src/contexts/fortune-teller/predict/application/create/fortune-teller-predict-obtainer";

describe("FortuneTellerPredictObtainer", () => {
  it("get a prediction", async () => {
    const applicationService = new FortuneTellerPredictObtainer();

    const prediction = await applicationService.run();

    expect(typeof prediction).toBe("string");
  });
});
