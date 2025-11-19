import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateOrderRequest, DetailOrderResponse, OrderReport, OrderResponse } from "../models/order.model";
import { DynamicResponseModel, ResponseMessage } from "../models/response.model";
import { ReportType } from "../core.constants";

@Injectable({
  providedIn: "root",
})

export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  createOrder(orderData: CreateOrderRequest): Observable<ResponseMessage<number>> {
    return this.http.post<ResponseMessage<number>>(this.apiUrl, orderData);
  }

  getOrders(
    page: number = 1,
    size: number = 20,
    sortField: string = "createdDate",
    sortDirection: "asc" | "desc" = "desc",
    startTime?: string,
    endTime?: string
  ): Observable<DynamicResponseModel<OrderResponse>> {
    let params = new HttpParams()
      .set("page", page)
      .set("pageSize", size)
      .set("sort", `${sortField},${sortDirection}`);

    if (startTime) params = params.set("startTime", startTime);
    if (endTime) params = params.set("endTime", endTime);

    return this.http.get<DynamicResponseModel<OrderResponse>>(this.apiUrl, { params });
  }

  getOrderById(orderId: number): Observable<ResponseMessage<DetailOrderResponse>> {
    return this.http.get<ResponseMessage<DetailOrderResponse>>(`${this.apiUrl}/${orderId}`);
  }

  getOrderReport(
    startDate: string,
    endDate: string,
    reportFilterEnum: ReportType
  ): Observable<OrderReport[]> {
    const params = new HttpParams()
      .set("startDate", startDate)
      .set("endDate", endDate)
      .set("reportFilterEnum", reportFilterEnum);

    return this.http.get<OrderReport[]>(`${this.apiUrl}/report`, { params });
  }

  updateOrderDetail(
    orderId: number,
    payload: { bookId: number; status: string }[]
  ) {
    return this.http.put(
      `${this.apiUrl}/${orderId}/order-detail`,
      payload
    );
  }
}