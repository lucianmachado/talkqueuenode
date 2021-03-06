import Queue from "bull";
import redisConfig from "../../config/redis";

import * as jobs from "../jobs";

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}));

export default {
  getQueues() {
    return queues;
  },
  add(name, data) {
    const queue = this.getQueues().find((queue) => queue.name === name);
    return queue.bull.add(data);
  },
  process() {
    return this.getQueues().forEach((queue) => {
      queue.bull.on("failed", (job, err) => {
        console.log(`Job Failed ${job.name} data: ${job.data}`);
        console.error(err);
      });
      queue.bull.process(queue.handle);
    });
  },
};
