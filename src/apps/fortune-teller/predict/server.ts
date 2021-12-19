import Koa from "koa";
import http from "http";
import { Logger } from "../../../contexts/shared/domain/logger";
import { container } from "./dependency-injection";
import Router from "koa-router";
import { registerRoutes } from "./routes";

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
