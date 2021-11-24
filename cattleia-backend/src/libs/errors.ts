export interface Stacked {
  message: string;
  code: number;
}
/* istanbul ignore next */
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
  productAlreadyExist: {
    message: "The product this this ID already exist.",
    code: 7201,
  },
  productDoesntExist: {
    message: "The product this this ID doesn't exist.",
    code: 7204,
  },
  metadataAlreadyExist: {
    message: "The metadata for this NFT already exist.",
    code: 7001,
  },
  metadataDoesntExist: {
    message: "The metadata for this NFT doesn't exist.",
    code: 7004,
  },
  invalidAmount: {
    message: "Invalid amount, must be greater than 0.5$",
    code: 6060,
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
    message: "There's no wallet account for this user.",
    code: 4065,
  },
  hasWalletAccount: {
    message: "There's already a wallet account for this user.",
    code: 4055,
  },
  noAdmin: {
    message: "You need to be an admin.",
    code: 4045,
  },

  invalidID: (id: string) => ({
    message: `There's no user with ID <${id}>.`,
    code: 4040,
  }),
  invalidIDorNoWallet: (id: string) => ({
    message: `There's no user with ID <${id}> or the user has no wallet account.`,
    code: 4020,
  }),
};
