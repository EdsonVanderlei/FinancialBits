import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CardComponent } from '../shared/components/card.component';
import { BalanceComponent } from './features/balance/balance.component';
import { CategoriesChartComponent } from './features/categories-chart/categories-chart.component';
import { CategoriesFilterComponent } from './features/categories-filter/categories-filter.component';
import { PeriodFilterComponent } from './features/period-filter/period-filter.component';
import { TransactionsChartComponent } from './features/transactions-chart/transactions-chart.component';
import { TransactionsListComponent } from './features/transactions-list/transactions-list.component';
import { UserMenuComponent } from './features/user-menu/user-menu.component';
import { WalletsFilterComponent } from './features/wallets-filter/wallets-filter.component';
import { WalletsListComponent } from './features/wallets-list/wallets-list.component';
import { CategoriesState } from './states/categories.state';
import { TransactionsState } from './states/transactions.state';
import { WalletsState } from './states/wallets.state';

@Component({
  standalone: true,
  selector: 'app-private',
  imports: [
    CardModule,
    CardComponent,
    BalanceComponent,
    CategoriesChartComponent,
    CategoriesFilterComponent,
    PeriodFilterComponent,
    TransactionsChartComponent,
    TransactionsListComponent,
    UserMenuComponent,
    WalletsListComponent,
    WalletsFilterComponent,
  ],
  template: `
    <main
      class="mx-auto grid h-screen w-screen max-w-[1280px] gap-4 p-4"
      style=" grid-template-rows: min-content 1fr;"
    >
      <div class="flex items-end gap-4">
        <div class="h-full flex items-center">
          <img width="128" src="logo.svg" alt="Logo" />
        </div>
        <div class="flex-2"><app-period-filter /></div>
        <div class="flex-1"><app-wallets-filter /></div>
        <div class="flex-1"><app-categories-filter /></div>
        <div><app-user-menu /></div>
      </div>
      <div
        class="grid gap-4 overflow-auto"
        style="
          grid-template-rows: 1fr 2fr;
          grid-template-columns: 1fr 1fr 1fr;
          "
      >
        <div class="overflow-hidden"><app-balance /></div>
        <div class="overflow-auto"><app-wallets-list /></div>
        <div class="overflow-hidden"><app-categories-chart /></div>
        <div class="col-span-2 overflow-hidden"><app-transactions-chart /></div>
        <div class="overflow-auto"><app-transactions-list /></div>
      </div>
    </main>
  `,
})
export class PrivateComponent implements OnInit {
  private walletsState = inject(WalletsState);
  private categoriesState = inject(CategoriesState);
  private transactionsState = inject(TransactionsState);

  ngOnInit() {
    this.walletsState.init();
    this.categoriesState.init();
    this.transactionsState.init();
  }
}
