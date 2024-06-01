import Joi from "joi";

export const createOrderSchema = Joi.object({
  order: Joi.array().required(),
});

export const updateOrderSchema = Joi.object({
  order: Joi.array(),
});
