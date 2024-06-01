import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const ordersAcceptedPath = path.resolve("db", "acceptedOrders.json");
console.log(ordersAcceptedPath);

const ordersCompletedPath = path.resolve("db", "completedOrders.json");

const updateAcceptedOrders = (acceptedOrders) =>
  fs.writeFile(ordersAcceptedPath, JSON.stringify(acceptedOrders, null, 2));

const updateCompletedOrders = (completedOrders) =>
  fs.writeFile(ordersCompletedPath, JSON.stringify(completedOrders, null, 2));

export async function getAcceptedOrders() {
  const data = await fs.readFile(ordersAcceptedPath);
  console.log(data);
  return JSON.parse(data);
}

export async function getCompletedOrders() {
  const data = await fs.readFile(ordersCompletedPath);
  return JSON.parse(data);
}

export async function getOrderById(orderId) {
  const acceptedOrders = await getAcceptedOrders();
  const result = acceptedOrders.find((order) => order.id === orderId);
  return result || null;
}

export async function removeOrder(id) {
  const acceptedOrders = await getAcceptedOrders();
  const index = acceptedOrders.findIndex((order) => order.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = accepted.splice(index, 1);
  await updateAcceptedOrders(acceptedOrders);
  return result;
}

export async function moveOrderById(orderId) {
  const acceptedOrders = await getAcceptedOrders();
  const orderIndex = acceptedOrders.findIndex((order) => order.id === orderId);

  if (orderIndex === -1) {
    throw new Error("Order not found");
  }

  const [order] = acceptedOrders.splice(orderIndex, 1);
  await updateAcceptedOrders(acceptedOrders);
  await updateCompletedOrders(order);

  return order;
}

export const updateOrderById = async (id, data) => {
  const acceptedOrders = await getAcceptedOrders();
  const index = acceptedOrders.findIndex((order) => order.id === id);
  if (index === -1) {
    return null;
  }
  orders[index] = { ...acceptedOrders[index], ...data };
  await updateOrders(acceptedOrders);

  return acceptedOrders[index];
};

export async function addOrder(data) {
  const acceptedOrders = await getAcceptedOrders();
  const newOrder = {
    id: nanoid(),
    ...data,
  };
  acceptedOrders.push(newOrder);
  await updateAcceptedOrders(acceptedOrders);
  return newOrder;
}
