import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { ToastSpinnerComponent } from './components/toast-spinner/toast-spinner.component';

@NgModule({
  declarations: [
    ToastComponent,
    ToastSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent,
    ToastSpinnerComponent
  ]
})
export class SharedModule { }
