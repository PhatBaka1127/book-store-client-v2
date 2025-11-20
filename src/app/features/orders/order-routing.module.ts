import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ListOrderComponent } from './pages/list-order/list-order.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: '', component: ListOrderComponent },
  { path: ':id', component: OrderDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}