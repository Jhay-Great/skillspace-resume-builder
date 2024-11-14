import { Injectable, signal, WritableSignal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastPositionType } from 'primeng/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastPosition: WritableSignal<ToastPositionType> = signal('top-center');

  constructor(private messageService: MessageService) {}

  showToast(
    severity: string,
    summary: string,
    detail: string,
    life: number = 3000
  ) {
    this.messageService.add({
      key: 'confirm',
      severity,
      summary,
      detail,
      life,
    });
  }

  showSuccess(
    summary: string,
    detail: string,
    position: ToastPositionType = 'top-center'
  ) {
    this.showToast('success-toast', summary, detail);
    this.toastPosition.set(position);
  }

  showWarning(
    summary: string,
    detail: string,
    position: ToastPositionType = 'top-center'
  ) {
    this.showToast('warning-toast', summary, detail);
    this.toastPosition.set(position);
  }

  showError(summary: string, detail: string, position: ToastPositionType = 'top-center') {
    this.showToast('error-toast', summary, detail);
    this.toastPosition.set(position);
  }
}
