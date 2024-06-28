export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  createdAt: Date;
  updatedAt?: Date;
};
