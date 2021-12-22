import { Answer } from "../../domain/answer";
import { Response } from "../../../../shared/domain/response";

export class ObtainAnswerResponse extends Response {
  readonly answer: Answer;

  constructor(answer: Answer) {
    super();
    this.answer = answer;
  }
}
