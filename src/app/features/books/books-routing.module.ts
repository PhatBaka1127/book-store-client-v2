import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBookComponent } from './pages/list-book/list-book.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';

const routes: Routes = [
  { path: 'list-book', component: ListBookComponent },
  { path: "book-detail/:id", component: BookDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {}