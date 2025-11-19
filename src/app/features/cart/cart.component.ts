import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CartItemCookie, CartItem } from 'src/app/core/models/cart.model';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    const cartCookie = this.cookieService.get('cart');
    const cart: CartItemCookie[] = cartCookie ? JSON.parse(cartCookie) : [];

    cart.forEach(item => {
      this.bookService.getBookById(item.bookId).subscribe({
        next: book => {
          this.cartItems.push({ ...item, book });
          this.calculateTotal();
        },
        error: () => console.error('Failed to load book', item.bookId)
      });
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + (item.book?.unitPrice || 0) * item.quantity,
      0
    );
  }

  updateCartCookie() {
    const cookieData: CartItemCookie[] = this.cartItems.map(item => ({
      bookId: item.bookId,
      quantity: item.quantity
    }));
    this.cookieService.set('cart', JSON.stringify(cookieData), undefined, '/');
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.updateCartCookie();
    this.calculateTotal();
  }

  clearCart() {
    this.cartItems = [];
    this.cookieService.delete('cart', '/');
    this.total = 0;
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
