export type GetTransactionsAction = { month: number; year: number };

export type CreateTransactionAction = {
  date: Date;
  title: string;
  value: number;
  walletId: string;
  categoryId?: string | null;
};

export type UpdateTransactionAction = {
  id: string;
  date?: Date;
  title?: string;
  value?: number;
  categoryId?: string | null;
};

export type DeleteTransactionAction = {
  id: string;
  walletId: string;
};
