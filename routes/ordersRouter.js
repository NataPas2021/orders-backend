import express from "express";
import ordersControllers from "../controllers/ordersControllers.js";
import isBodyEmpty from "../middlewares/isBodyEmpty.js";
// import validateBody from "../decorators/validateBody.js";
// import {
//   createOrderSchema,
//   updateOrderSchema,
// } from "../schemas/orderSchemas.js";

const ordersRouter = express.Router();

// Получить все принятые заказы
ordersRouter.get("/accepted-orders", ordersControllers.getAccepted);

// Получить все выполненные заказы
ordersRouter.get("/completed-orders", ordersControllers.getCompleted);

ordersRouter.get("/:id", ordersControllers.getOneOrder);

ordersRouter.delete("/:id", ordersControllers.deleteOrder);

// Добавить новый принятый заказ
ordersRouter.post(
  "/accepted-orders",
  //validateBody(createOrderSchema),
  isBodyEmpty,
  ordersControllers.createOrder
);

// Переместить заказ из принятых в выполненные
ordersRouter.post(
  "/complete-order/:id",
  //isBodyEmpty,
  ordersControllers.moveOrderToCompleted
);

export default ordersRouter;
