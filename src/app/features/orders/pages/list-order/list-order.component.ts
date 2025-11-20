import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OrderResponse } from "src/app/core/models/order.model";
import { OrderService } from "src/app/core/services/order.service";

@Component({
  selector: "app-order-history",
  templateUrl: "./list-order.component.html",
  styleUrls: ["./list-order.component.scss"],
})
export class ListOrderComponent implements OnInit {
  orders: OrderResponse[] = [];
  loading = false;

  currentPage = 1;
  totalPages = 1;
  pageSize = 5;
  totalItems = 0;

  sortField = "createdDate";
  sortDirection: "asc" | "desc" = "desc";

  startTime?: string;
  endTime?: string;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(page: number = 1): void {
    this.loading = true;
    this.orderService
      .getOrders(
        page,
        this.pageSize,
        this.sortField,
        this.sortDirection,
        this.startTime,
        this.endTime
      )
      .subscribe({
        next: (res) => {
          this.orders = res.results;
          this.currentPage = res.metaData.page;
          this.pageSize = res.metaData.size;
          this.totalItems = res.metaData.total;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }

  changeSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortField = field;
      this.sortDirection = "desc";
    }
    this.loadOrders(1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.loadOrders(page);
  }

  viewOrderDetail(orderId: number): void {
    this.router.navigate([`/orders/${orderId}`]);
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadOrders();
  }
}
