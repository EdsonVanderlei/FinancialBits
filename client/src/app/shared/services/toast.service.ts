import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService = inject(MessageService);

  private add(severity: string, summary: string, detail?: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }

  addError(summary: string, detail?: string) {
    this.add('error', summary, detail);
  }

  addSuccess(summary: string, detail?: string) {
    this.add('success', summary, detail);
  }
}
