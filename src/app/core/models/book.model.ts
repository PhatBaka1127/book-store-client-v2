export interface BookDTO {
  name: string;
  description?: string;
  unitPrice?: number;
  stock?: number;
  status?: number;
  categoryId?: number;
}

export interface BookResponse extends BookDTO {
  id: number;
  image?: string;
  sellerId: number;
  sellerName?: string;
  categoryId: number;
  categoryName: string;
  quantity: number;
}

export interface CreateBookRequest extends BookDTO {
  image?: File;
}

export interface UpdateBookRequest extends BookDTO {
  image?: File | string;
}
