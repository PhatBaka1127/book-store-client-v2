import { OrderDetailDTO, OrderDetailResponse } from "./order-detail.model";

export interface CreateOrderRequest {
  phone: string;
  address: string;
  orderDetails: OrderDetailDTO[];
}

export interface OrderReport {
  date: string;
  orders: number;
  quantity: number;
  revenue: number;
}

export interface OrderDTO {
  id: number;
  createdDate: string;
  quantity: number;
  totalPrice: number;
  status: string;
  updatedDate: string;
  phone: string;
  address: string;
}

export interface OrderResponse extends OrderDTO {
  
}

export interface DetailOrderResponse extends OrderDTO {
    orderDetails: OrderDetailResponse[];
}