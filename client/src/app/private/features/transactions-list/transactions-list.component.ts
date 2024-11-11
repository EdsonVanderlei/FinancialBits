import { Component, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TreeTableModule } from 'primeng/treetable';
import { CardComponent } from '../../../shared/components/card.component';
import { ListBaseDirective } from '../../directives/list-base.directive';
import { CategoriesState } from '../../states/categories.state';
import { TransactionsState } from '../../states/transactions.state';
import { WalletsState } from '../../states/wallets.state';
import { Transaction } from '../../types/transaction/transaction';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionsListItemComponent } from './transactions-list-item/transactions-list-item.component';

@Component({
  standalone: true,
  selector: 'app-transactions-list',
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    TreeTableModule,
    CardComponent,
    TransactionsListItemComponent,
    TransactionFormComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent extends ListBaseDirective<Transaction> {
  private transactionsState = inject(TransactionsState);
  private walletsState = inject(WalletsState);
  private categoriesState = inject(CategoriesState);

  override baseTitle = 'Transação';

  wallets = this.walletsState.wallets;
  categories = this.categoriesState.categories;
  groups = this.transactionsState.filteredGroups;

  protected override createCallback = (value: Partial<Transaction>) =>
    this.transactionsState.create({
      date: value.date!,
      title: value.title!,
      value: value.value!,
      walletId: value.wallet!.id,
      categoryId: value.category?.id,
    });

  protected override updateCallback = (value: Partial<Transaction>) =>
    this.transactionsState.update({
      id: value.id!,
      date: value.date,
      title: value.title,
      value: value.value,
      categoryId: value.category?.id,
    });

  protected override deleteCallback = (value: Transaction) =>
    this.transactionsState.delete({ id: value.id, walletId: value.wallet.id });
}
