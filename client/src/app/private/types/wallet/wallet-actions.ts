export type CreateWalletAction = {
  name: string;
  balance?: number;
};

export type UpdateWalletAction = {
  id: string;
  name: string;
};

export type DeleteWalletAction = {
  id: string;
};
