import * as ordersService from "../services/ordersServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAccepted = async (req, res, next) => {
  try {
    const result = await ordersService.getAcceptedOrders();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getCompleted = async (req, res, next) => {
  try {
    const result = await ordersService.getCompletedOrders();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getOneOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ordersService.getOrderById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  const result = await ordersService.removeOrder(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const createOrder = async (req, res) => {
  const result = await ordersService.addOrder(req.body);
  res.status(201).json(result);
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const result = await ordersService.updateOrderById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const moveOrderToCompleted = async (req, res) => {
  const { id } = req.params;
  const result = await ordersService.moveOrderById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default {
  getAccepted: ctrlWrapper(getAccepted),
  getCompleted: ctrlWrapper(getCompleted),
  getOneOrder: ctrlWrapper(getOneOrder),
  deleteOrder: ctrlWrapper(deleteOrder),
  createOrder: ctrlWrapper(createOrder),
  moveOrderToCompleted: ctrlWrapper(moveOrderToCompleted),
  updateOrder: ctrlWrapper(updateOrder),
};
