import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card.component';
import { TableModule } from 'primeng/table';
import { WalletsState } from '../../states/wallets.state';
import { CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-wallets-list',
  imports: [CurrencyPipe, TableModule, CardComponent],
  templateUrl: './wallets-list.component.html',
  styleUrl: './wallets-list.component.scss',
})
export class WalletsListComponent {
  private walletsState = inject(WalletsState);
  wallets = this.walletsState.filteredWallets;
}
