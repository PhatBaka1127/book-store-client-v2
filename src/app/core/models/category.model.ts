export interface CategoryDTO {
  name: string;
  status: number;
}

export interface CategoryResponse extends CategoryDTO {
  id: number;
}