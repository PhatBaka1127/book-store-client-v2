import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartItemCookie  } from 'src/app/core/models/cart.model';
import { BookService } from 'src/app/core/services/book.service';
import { BookResponse } from 'src/app/core/models/book.model';
import { CreateOrderRequest } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ResponseMessage, ErrorResponse } from 'src/app/core/models/response.model';
import { delay } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: { book: BookResponse; quantity: number }[] = [];
  total = 0;
  loading = true;
  phoneNumber = '';
  address = '';

  constructor(
    private cookieService: CookieService,
    private bookService: BookService,
    private orderService: OrderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const cartCookie = this.cookieService.get('cart');
    const cart: CartItemCookie [] = cartCookie ? JSON.parse(cartCookie) : [];

    // Fetch all book info for cart items
    cart.forEach(item => {
      this.bookService.getBookById(item.bookId).pipe(delay(2000)).subscribe(book => {
        this.cartItems.push({ book, quantity: item.quantity });
        this.calculateTotal();
        this.loading = false;
      });
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.book.unitPrice * item.quantity,
      0
    );
  }

  checkout() {
    if (!this.phoneNumber || !this.address) {
      this.toastService.showMessage("Please input all information", false, 2000);
      return;
    }

    const orderPayload: CreateOrderRequest = {
      phone: this.phoneNumber,
      address: this.address,
      orderDetails: this.cartItems.map(item => ({
        bookId: item.book.id,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(orderPayload).subscribe({
      next: (res: ResponseMessage<number>) => {
        this.toastService.showMessage(res.message, true, 2000);
        this.cookieService.delete('cart', '/');
        this.cartItems = [];
        this.total = 0;
      },
      error: (res: ErrorResponse) => {
        console.error(res);
        this.toastService.showMessage(res.message, false, 2000);
      }
    });
  }
}
