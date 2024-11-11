import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardComponent } from '../../../shared/components/card.component';
import { AuthState } from '../../../core/states/auth.state';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-user-menu',
  imports: [CardComponent, ButtonModule, OverlayPanelModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  private router = inject(Router);
  private authState = inject(AuthState);

  user = this.authState.user;

  onLogout() {
    this.authState.setUser(null);
    this.authState.setTokens(null);
    this.router.navigate(['/public'])
  }
}
