export interface Category {
  id?: number;
  name: string;
  parentId?: number;
}

export interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
}
