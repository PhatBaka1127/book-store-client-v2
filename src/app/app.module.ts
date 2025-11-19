import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { LoginComponent } from "./features/auth/pages/login/login.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { CartComponent } from "./features/orders/pages/cart/cart.component";
import { CheckoutComponent } from "./features/orders/pages/checkout/checkout.component";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
