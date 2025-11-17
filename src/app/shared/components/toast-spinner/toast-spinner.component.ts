import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-spinner',
  templateUrl: './toast-spinner.component.html',
  styleUrls: ['./toast-spinner.component.scss']
})
export class ToastSpinnerComponent {
  @Input() message: string = 'Loading...';
  @Input() visible: boolean = false;

  close() {
    this.visible = false;
  }
}
