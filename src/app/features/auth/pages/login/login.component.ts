import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthResponse } from "src/app/core/models/auth.model";
import {
  ErrorResponse,
  ResponseMessage,
} from "src/app/core/models/response.model";
import { AuthService } from "src/app/core/services/auth.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.toastService.showMessage(
        "Please input all information",
        false,
        4000
      );
      return;
    }

    this.loading = true; // show spinner
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: ResponseMessage<AuthResponse>) => {
        console.log("Login success:", res);

        const value = res.value;
        if (value?.accessToken) {
          this.cookieService.set("token", value.accessToken, undefined, "/");
        }

        if (value) {
          this.cookieService.set(
            "user",
            JSON.stringify({
              id: value.id,
              email: value.email,
              role: value.role,
            }),
            undefined,
            "/"
          );
        }

        this.toastService.showMessage(res.message, !!res.result, 2000);
        this.loading = false;

        if (value.role === 0) {
          this.router.navigate(["/books"]);
        } 
      },
      error: (res: ErrorResponse) => {
        console.error("Login failed:", res);
        this.toastService.showMessage(
          res.message || "Unknown error",
          !!res.result,
          2000
        );
        this.loading = false;
      },
    });
  }
}
