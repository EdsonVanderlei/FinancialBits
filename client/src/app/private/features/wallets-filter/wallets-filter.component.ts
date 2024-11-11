import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { CardComponent } from '../../../shared/components/card.component';
import { FormFieldDirective } from '../../../shared/directives/form-field.directive';
import { ListBaseDirective } from '../../directives/list-base.directive';
import { WalletsService } from '../../services/wallets.service';
import { Wallet } from '../../types/wallet/wallet';
import { WalletFormComponent } from './wallet-form/wallet-form.component';
import { WalletsState } from '../../states/wallets.state';

@Component({
  standalone: true,
  selector: 'app-wallets-filter',
  imports: [
    FormsModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    MultiSelectModule,
    CardComponent,
    FormFieldDirective,
    WalletFormComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './wallets-filter.component.html',
  styleUrl: './wallets-filter.component.scss',
})
export class WalletsFilterComponent extends ListBaseDirective<Wallet> {
  private walletsState = inject(WalletsState);

  @ViewChild('multiSelect') multiSelect?: MultiSelect;

  override baseTitle = 'Carteira';
  wallets = this.walletsState.wallets;
  selectedWallets = this.walletsState.selectedWallets;

  selectedWalletsChange(event: string[]) {
    this.walletsState.setSelectedWallets(event);
  }

  onEvent(event: Event) {
    event.stopPropagation();
    this.multiSelect?.close(event);
  }

  override createCallback = (value: Partial<Wallet>) =>
    this.walletsState.create({ name: value.name!, balance: value.balance });

  override updateCallback = (value: Partial<Wallet>) =>
    this.walletsState.update({ id: value.id!, name: value.name! });

  override deleteCallback = (value: Wallet) =>
    this.walletsState.delete({ id: value.id });
}
