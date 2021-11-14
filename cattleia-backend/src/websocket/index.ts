import { EventStack } from "./core";

const stack = new EventStack();

stack.push("ping", function (data) {
  console.log(data);
  this.emit("pong", { msg: "test" });
});

export default stack;
