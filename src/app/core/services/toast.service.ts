// toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseMessage } from '../models/response-message.model';
import { ErrorResponse } from '../models/error-response.model';

export interface ToastMessage {
  id: number;
  text: string;
  isSuccess: boolean;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private counter = 0;

  // Basic toast
  showMessage(text: string, isSuccess: boolean = true, duration: number = 3000) {
    const id = this.counter++;
    const toast: ToastMessage = { id, text, isSuccess, duration };
    this.messagesSubject.next([...this.messagesSubject.value, toast]);

    setTimeout(() => this.removeToast(id), duration);
  }

  // Show toast from typed API response
  showFromResponse<T>(response: ResponseMessage<T> | ErrorResponse) {
    const isSuccess = 'result' in response ? !!response.result : false;
    const message = response.message || (isSuccess ? 'Success' : 'Error');
    this.showMessage(message, isSuccess);
  }

  removeToast(id: number) {
    this.messagesSubject.next(this.messagesSubject.value.filter(t => t.id !== id));
  }
}