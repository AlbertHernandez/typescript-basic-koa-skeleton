import { QueryHandler } from "../../../../shared/domain/query-handler";
import { ObtainAnswerQuery } from "./obtain-answer-query";
import { ObtainAnswerResponse } from "./obtain-answer-response";
import { FortuneTellerAnswerObtainer } from "./fortune-teller-answer-obtainer";
import { Query } from "../../../../shared/domain/query";
import { Question } from "../../../../shared/domain/question";

export class ObtainAnswerQueryHandler
  implements QueryHandler<Query, ObtainAnswerResponse>
{
  private readonly fortuneTellerAnswerObtainer;

  constructor(dependencies: {
    fortuneTellerAnswerObtainer: FortuneTellerAnswerObtainer;
  }) {
    this.fortuneTellerAnswerObtainer = dependencies.fortuneTellerAnswerObtainer;
  }

  subscribedTo(): Query {
    return ObtainAnswerQuery;
  }

  async handle(query: ObtainAnswerQuery): Promise<ObtainAnswerResponse> {
    return await this.fortuneTellerAnswerObtainer.run(
      new Question(query.question)
    );
  }
}
