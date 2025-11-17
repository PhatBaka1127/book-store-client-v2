// loading-toast.service.ts
import { Injectable } from '@angular/core';
import { ToastrService, ActiveToast } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoadingToastService {
  private currentToast?: ActiveToast<any>;

  constructor(private toastr: ToastrService) {}

  show(message: string = 'Loading...') {
    // Prevent multiple toasts stacking
    if (this.currentToast) return;

    this.currentToast = this.toastr.info(
      `<span class="spinner"></span> ${message}`,
      '', 
      {
        enableHtml: true,
        disableTimeOut: true,   // Keeps toast visible
        tapToDismiss: false,    // Can't dismiss by clicking
        closeButton: false,
      }
    );
  }

  hide() {
    if (this.currentToast) {
      this.toastr.clear(this.currentToast.toastId);
      this.currentToast = undefined;
    }
  }
}