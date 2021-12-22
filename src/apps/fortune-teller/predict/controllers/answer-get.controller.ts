import { Controller } from "./controller";
import Koa from "koa";
import { QueryBus } from "../../../../contexts/shared/domain/query-bus";
import { HttpResponse } from "../models/http-response";
import { ObtainAnswerQuery } from "../../../../contexts/fortune-teller/predict/application/get-answer/obtain-answer-query";
import { ObtainAnswerResponse } from "../../../../contexts/fortune-teller/predict/application/get-answer/obtain-answer-response";

export default class AnswerGetController implements Controller {
  private readonly queryBus;

  constructor(dependencies: { queryBus: QueryBus }) {
    this.queryBus = dependencies.queryBus;
  }

  async run(ctx: Koa.Context) {
    const { question } = ctx.query as { question: string };
    const answerResponse = await this.queryBus.ask<ObtainAnswerResponse>(
      new ObtainAnswerQuery(question)
    );

    return new HttpResponse({
      data: {
        answer: answerResponse.answer.value,
      },
    });
  }
}
