import express from "express";
import UserController from "./app/controllers/UserController";
import QueueService from "./app/services/QueueService";

const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");

const { router } = createBullBoard(
  QueueService.getQueues().map((q) => new BullAdapter(q.bull))
);

const PORT = 3000;

const app = express();

app.use(express.json());

app.post("/", UserController.createUser);

app.use("/admin/queues", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
