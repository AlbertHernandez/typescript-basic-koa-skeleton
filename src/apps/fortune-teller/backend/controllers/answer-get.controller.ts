import { Controller } from "./controller";
import Joi from "joi";
import Koa from "koa";
import { QueryBus } from "../../../../contexts/shared/domain/query-bus";
import { HttpResponse } from "../models/http-response";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { ObtainAnswerResponse } from "../../../../contexts/fortune-teller/answer/application/get-answer/obtain-answer-response";
import { ObtainAnswerQuery } from "../../../../contexts/fortune-teller/answer/application/get-answer/obtain-answer-query";

export default class AnswerGetController implements Controller {
  private readonly queryBus;

  constructor(dependencies: { queryBus: QueryBus }) {
    this.queryBus = dependencies.queryBus;
  }

  static schema(): SchemasConfig {
    return {
      query: Joi.object({
        question: Joi.string().required(),
      }),
    };
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
