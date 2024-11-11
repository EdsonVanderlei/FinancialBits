import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { GroupedTransactions } from '../../../types/transaction/grouped-transactions';
import { Transaction } from '../../../types/transaction/transaction';

@Component({
  standalone: true,
  selector: 'app-transactions-list-item',
  imports: [
    CurrencyPipe,
    DatePipe,
    ChipModule,
    ButtonModule,
    MenuModule,
    OverlayPanelModule,
    TooltipModule,
  ],
  templateUrl: './transactions-list-item.component.html',
  styleUrl: './transactions-list-item.component.scss',
})
export class TransactionsListItemComponent {
  group = input<GroupedTransactions>();

  onUpdate = output<Transaction>();
  onDelete = output<Transaction>();

  opened = signal(true);

  toggle() {
    this.opened.update((_) => !_);
  }

  options: MenuItem[] = [
    { label: 'Update', icon: 'pi pi-pencil' },
    { label: 'Delete', icon: 'pi pi-trash' },
  ];
}
