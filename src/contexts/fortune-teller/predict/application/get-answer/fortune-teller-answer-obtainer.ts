import { ObtainAnswerResponse } from "./obtain-answer-response";
import { YesAnswer } from "../../domain/yes-answer";
import { NoAnswer } from "../../domain/no-answer";
import { Question } from "../../domain/question";

export class FortuneTellerAnswerObtainer {
  async run(question: Question): Promise<ObtainAnswerResponse> {
    if (question.value.length < 5) {
      return new ObtainAnswerResponse(new YesAnswer());
    }
    return new ObtainAnswerResponse(new NoAnswer());
  }
}
