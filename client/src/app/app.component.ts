import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  template: `
    <router-outlet></router-outlet>
    <p-toast position="bottom-center" />
  `,
})
export class AppComponent {}
