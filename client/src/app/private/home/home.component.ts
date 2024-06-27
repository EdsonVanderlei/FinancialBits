import { Component } from '@angular/core';
import { ActionsComponent } from '../actions/actions.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ToolbarComponent, ActionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
