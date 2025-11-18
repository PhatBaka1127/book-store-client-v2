import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ErrorResponse, ResponseMessage } from 'src/app/core/models/response.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.toastService.showMessage(
        'Please input all information',
        false,
        4000
      );
      return;
    }

    this.loading = true; // show spinner
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: ResponseMessage<any>) => {
        this.toastService.showFromResponse(res);
        this.loading = false; // hide spinner

        if (res.value?.role === 1) this.router.navigate(['/dashboard']);
        else this.router.navigate(['/home']);
      },
      error: (err: ErrorResponse) => {
        this.toastService.showFromResponse(err);
        this.loading = false; // hide spinner
      },
    });
  }
}
