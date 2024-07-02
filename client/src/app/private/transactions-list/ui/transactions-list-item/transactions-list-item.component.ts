import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Transaction } from '../../../../shared/types/transaction';

@Component({
  standalone: true,
  selector: 'app-transactions-list-item',
  imports: [ButtonModule, DatePipe, CurrencyPipe],
  template: `
    @if(transaction(); as transaction){
    <div class="grid">
      <small class="text-xs text-neutral-600">{{ transaction.date | date }}</small>
      <span class="text-base">{{ transaction.description }}</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-base font-medium">{{ transaction.value | currency }}</span>
      <span class="text-xs" [class]="getIcon(transaction.value)"></span>
      <p-button text severity="secondary" size="small" icon="pi pi-ellipsis-v"></p-button>
    </div>
    }
  `,
  host: { class: 'app-transactions-list-item flex justify-between items-center' },
})
export class TransactionsListItemComponent {
  transaction = input<Transaction>();

  getIcon = (value: number) =>
    value > 0 ? 'pi pi-arrow-down-left text-green-400' : 'pi pi-arrow-up-right text-red-400';
}
