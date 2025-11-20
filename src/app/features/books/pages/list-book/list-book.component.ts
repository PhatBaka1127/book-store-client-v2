import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { BookResponse } from "src/app/core/models/book.model";
import { CategoryResponse } from "src/app/core/models/category.model";
import { BookService } from "src/app/core/services/book.service";
import { CategoryService } from "src/app/core/services/category.service";

@Component({
  selector: "app-home",
  templateUrl: "./list-book.component.html",
  styleUrls: ["./list-book.component.scss"],
})
export class ListBookComponent implements OnInit {
  books: BookResponse[] = [];
  loading = true;
  userRole: number | null = null;
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  totalItems = 0;
  categories: CategoryResponse[] = [];
  filter = { name: "", categoryId: "" };

  constructor(
    private bookService: BookService,
    private router: Router,
    private cookieService: CookieService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const userCookie = this.cookieService.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        this.userRole = user.role;
      } catch (err) {
        console.error("Fail in parsing user cookie:", err);
      }
    }

    this.loadCategories();
    this.loadBooks();
  }

  loadCategories(): void {
    this.loading = true;

    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.loadBooks();
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load categories:", err);
        this.loadBooks();
        this.loading = false;
      },
    });
  }

  loadBooks(page: number = 1): void {
    this.bookService
      .getBooks(page, this.pageSize, this.filter.name, this.filter.categoryId)
      .subscribe({
        next: (res) => {
          this.books = res.results;
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

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.loadBooks(page);
  }

  goToCreateBook() {
    this.router.navigate(["/books/create-book"]);
  }

  goToDetail(bookId: number) {
    this.router.navigate(["/books/", bookId]);
  }

  applyFilter() {
    this.currentPage = 1;
    this.loadBooks();
  }
}
