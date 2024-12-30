export type Category = {
  id?: number;
  name: string;
  parentId?: number;
  children?: Category[];
};

export interface FilePreview {
  images: string[];
  details: { [key: number]: string };
}
export type Group = {
  id?: number;
  name: string;
};
