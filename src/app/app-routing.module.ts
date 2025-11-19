import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { CartComponent } from "./features/cart/cart.component";
import { CheckoutComponent } from "./features/checkout/checkout.component";

const routes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "books",
    loadChildren: () =>
      import("./features/books/book.module").then((m) => m.BookModule),
  },
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      { path: "cart", component: CartComponent },
      { path: "checkout", component: CheckoutComponent },
    ],
  },
  // Wild card/ default must be in the end
  { path: "**", redirectTo: "auth/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
