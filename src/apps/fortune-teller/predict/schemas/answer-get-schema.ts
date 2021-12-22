import Joi from "joi";

export const answerGetSchema = {
  query: Joi.object({
    question: Joi.string().required(),
  }),
};
