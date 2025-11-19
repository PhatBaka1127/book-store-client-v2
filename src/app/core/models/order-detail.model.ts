export interface OrderDetailDTO {
  bookId: number;
  quantity: number;
}

export interface OrderDetailResponse extends OrderDetailDTO {
  orderId: number;
  bookName: string;
  bookImage: string;
  unitPrice: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}