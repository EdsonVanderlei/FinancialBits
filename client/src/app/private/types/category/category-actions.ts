export type CreateCategoryAction = {
  name: string;
  color: string;
};

export type UpdateCategoryAction = {
  id: string;
  name?: string;
  color?: string;
};

export type DeleteCategoryAction = {
  id: string;
};
