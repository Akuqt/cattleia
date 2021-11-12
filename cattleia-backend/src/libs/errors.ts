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

export const errors = {
  noAuthToken: {
    message: "There's no auth token.",
    code: 9091,
  },
  invalidAuthToken: {
    message: "Invalid auth token.",
    code: 9090,
  },
  invalidRole: {
    message: "Invalid role.",
    code: 8020,
  },
  userAlreadyTaken: {
    message: "Username already taken.",
    code: 5342,
  },
  wrongUserOrPassword: {
    message: "Wrong username or password.",
    code: 5242,
  },
  wrongWalletPassword: {
    message: `Invalid wallet password.`,
    code: 5040,
  },
  noWalletAccount: {
    message: "There's no wallet accout for this user.",
    code: 4050,
  },
  noAdmin: {
    message: "You need to be an admin.",
    code: 4045,
  },
  invalidIDorNoWallet: (id: string) => ({
    message: `There's no user with ID <${id}> or the user has no wallet account.`,
    code: 4040,
  }),
};
