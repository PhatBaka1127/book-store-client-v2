import { NgModule } from '@angular/core';
import { ListBookComponent } from './pages/list-book/list-book.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './books-routing.module';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    ListBookComponent,
    BookDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BookRoutingModule,
    SharedModule
]
})
export class BookModule {}
