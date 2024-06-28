import { Component } from '@angular/core';
import { ActionsComponent } from '../actions/actions.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TransactionsListComponent } from '../transactions-list/transactions-list.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ToolbarComponent, ActionsComponent, TransactionsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
