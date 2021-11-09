export interface Stacked {
  message: string;
  code: number;
}

export const errorStack = (stack: Stacked[], e: Error) => {
  if (
    e.message.includes("is invalid, the capitalization checksum test failed")
  ) {
    stack.push({ message: "Invalid Address.", code: 5544 });
  }

  if (e.message.includes("should be a number matching (^-?[0-9.]+).")) {
    stack.push({ message: "Value to send must be a number.", code: 2255 });
  }
};
