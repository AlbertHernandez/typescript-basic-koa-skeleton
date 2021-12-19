import { Server } from "./server";

export class PredictBackendApp {
  private server?: Server;

  async start() {
    const port = process.env.PORT || "3000";
    this.server = new Server({
      port: Number(port),
    });
    return this.server.listen();
  }

  async stop() {
    await this.server?.stop();
  }

  get port(): number {
    if (!this.server) {
      throw new Error("Predict backend application has not been started");
    }
    return this.server.port;
  }

  get httpServer() {
    return this.server?.httpServer;
  }
}
