import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { BookResponse } from "src/app/core/models/book.model";
import { CartItemCookie } from "src/app/core/models/cart.model";
import { BookService } from "src/app/core/services/book.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.scss"],
})
export class BookDetailComponent implements OnInit {
  book: BookResponse | null = null;
  userRole: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private toastService: ToastService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const userCookie = this.cookieService.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        this.userRole = user.role;
      } catch {}
    }

    const bookId = Number(this.route.snapshot.paramMap.get("id"));
    this.bookService.getBookById(bookId).subscribe({
      next: (res) => (this.book = res),
      error: (err) => console.error(err),
    });
  }

  addToCart() {
    if (!this.book) return;

    const cartCookie = this.cookieService.get("cart");
    let cart: CartItemCookie[] = [];

    try {
      if (cartCookie) cart = JSON.parse(cartCookie);
    } catch {
      cart = [];
    }

    const existing = cart.find((item) => item.bookId === this.book!.id);

    if (existing) {
      existing.quantity += 1;
      this.toastService.showMessage(
        `Increased quantity to ${existing.quantity}`,
        true,
        2000
      );
    } else {
      cart.push({ bookId: this.book.id, quantity: 1 });
      this.toastService.showMessage(`Added to cart!`, true, 2000);
    }

    this.cookieService.set("cart", JSON.stringify(cart), undefined, "/");
  }

  rateBook() {
    throw new Error("Method not implemented.");
  }
}
