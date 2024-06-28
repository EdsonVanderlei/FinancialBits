import { Component } from '@angular/core';
import { ActionsComponent } from '../actions/actions.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TransactionsListComponent } from '../transactions-list/transactions-list.component';
import { OverviewComponent } from '../overview/overview.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ToolbarComponent, ActionsComponent, OverviewComponent, TransactionsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
