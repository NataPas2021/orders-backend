import express from "express";
import morgan from "morgan";
import cors from "cors";

import ordersRouter from "./routes/ordersRouter.js";

const app = express();
const port = 3000;

// Настройка CORS
const corsOptions = {
  origin: "http://example.com", // Замени на нужный домен
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(express.json());

// let acceptedOrders = [];
// let completedOrders = [];

app.use("/orders", ordersRouter);

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
