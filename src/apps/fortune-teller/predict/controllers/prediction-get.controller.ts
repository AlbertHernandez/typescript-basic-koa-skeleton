import { Controller } from "./controller";
import Koa from "koa";
import { QueryBus } from "../../../../contexts/shared/domain/query-bus";
import { ObtainPredictionResponse } from "../../../../contexts/fortune-teller/predict/application/create/obtain-prediction-response";
import { ObtainPredictionQuery } from "../../../../contexts/fortune-teller/predict/application/create/obtain-prediction-query";
import { HttpResponse } from "../models/http-response";

export default class PredictionGetController implements Controller {
  private readonly queryBus;

  constructor(dependencies: { queryBus: QueryBus }) {
    this.queryBus = dependencies.queryBus;
  }

  async run(ctx: Koa.Context) {
    const prediction = await this.queryBus.ask<ObtainPredictionResponse>(
      new ObtainPredictionQuery()
    );

    return new HttpResponse({
      data: prediction,
    });
  }
}
