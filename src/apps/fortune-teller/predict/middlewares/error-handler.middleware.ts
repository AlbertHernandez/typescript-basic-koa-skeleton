import httpStatus from "http-status";
import Koa from "koa";
import { BaseError } from "../../../../contexts/shared/domain/errors/base-error";

const INTERNAL_SERVER_ERROR = "Internal Server Error";

export const errorHandler = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next().catch((error: Error | BaseError) => {
      if (!(error instanceof BaseError)) {
        throw error;
      }

      const isClientError = Boolean(error.status.toString().startsWith("4"));
      ctx.status = isClientError
        ? error.status
        : httpStatus.INTERNAL_SERVER_ERROR;

      ctx.body = {
        error: {
          message: isClientError ? error.message : INTERNAL_SERVER_ERROR,
          meta: isClientError ? error.meta : undefined,
        },
      };
    });
  } catch (error) {
    ctx.body = {
      error: {
        message: INTERNAL_SERVER_ERROR,
      },
    };
    ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
};
