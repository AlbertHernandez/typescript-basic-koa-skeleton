import { ObtainAnswerResponse } from "./obtain-answer-response";
import { YesAnswer } from "../../../../shared/domain/yes-answer";
import { NoAnswer } from "../../../../shared/domain/no-answer";
import { Question } from "../../../../shared/domain/question";

export class FortuneTellerAnswerObtainer {
  async run(question: Question): Promise<ObtainAnswerResponse> {
    if (question.value.length < 5) {
      return new ObtainAnswerResponse(new YesAnswer());
    }
    return new ObtainAnswerResponse(new NoAnswer());
  }
}
