import dotenv from "dotenv";
import convict from "convict";

dotenv.config();

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "beta", "test", "development"],
    default: "development",
    env: "NODE_ENV",
  },
  logger: {
    level: {
      doc: "Level of the logger",
      format: ["debug", "info", "warn", "error", "fatal"],
      default: "fatal",
      env: "LOGGER_LEVEL",
    },
    isEnabled: {
      doc: "Indicates if logger is enabled",
      format: "Boolean",
      default: true,
      env: "LOGGER_ENABLE",
    },
  },
});

config.loadFile([
  __dirname + "/default.json",
  __dirname + "/" + config.get("env") + ".json",
]);

config.validate();

export { config };
