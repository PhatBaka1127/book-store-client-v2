import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { BookRoutingModule } from "../books/books-routing.module";
import { CartComponent } from "./pages/cart/cart.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { OrderRoutingModule } from "./order-routing.module";
import { ListOrderComponent } from "./pages/list-order/list-order.component";
import { OrderDetailComponent } from "./pages/order-detail/order-detail.component";

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    ListOrderComponent,
    OrderDetailComponent,
  ],
  imports: [CommonModule, OrderRoutingModule, RouterModule, SharedModule],
})
export class OrderModule {}
