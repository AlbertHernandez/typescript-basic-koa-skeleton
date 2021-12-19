import Koa from "koa";
import http from "http";
import requestId from "koa-requestid";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import responseTime from "koa-response-time";
import { Logger } from "../../../contexts/shared/domain/logger";
import { container } from "./dependency-injection";
import Router from "koa-router";
import { registerRoutes } from "./routes";
import { scopePerRequest } from "./middlewares/scope-per-request.middleware";
import { scopeLoggerPerRequest } from "./middlewares/scope-logger-per-request.middleware";
import { errorHandler } from "./middlewares/error-handler.middleware";

export class Server {
  private koa: Koa;
  readonly port: number;
  private logger: Logger;
  httpServer?: http.Server;

  constructor(dependencies: { port: number }) {
    this.logger = container.resolve<Logger>("logger");
    this.port = Number(dependencies.port);
    this.koa = new Koa();

    const router = new Router({
      prefix: "/api/v1",
    });

    registerRoutes(router);

    this.koa.use(responseTime());
    this.koa.use(errorHandler);
    this.koa.use(requestId());
    this.koa.use(bodyParser());
    this.koa.use(helmet());
    this.koa.use(scopePerRequest);
    this.koa.use(scopeLoggerPerRequest);

    this.koa.use(router.middleware());
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.koa.listen(this.port, () => {
        this.logger.info(
          `Fortune Teller Backend App is running at http://localhost:${this.port}`
        );
        this.logger.info("  Press CTRL-C to stop\n");
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
