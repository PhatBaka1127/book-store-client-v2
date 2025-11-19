export interface CartItemCookie  {
    bookId : number,
    quantity: number,
}

export interface CartItem extends CartItemCookie {
  book?: {
    id: number;
    name: string;
    unitPrice: number;
    image?: string;
  };
}