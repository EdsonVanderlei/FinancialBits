import { Component, computed, inject } from '@angular/core';
import { GreetingsComponent } from './ui/greetings/greetings.component';
import { AuthState } from '../../shared/states/auth.state';
import { UserAvatarComponent } from './ui/user-avatar/user-avatar.component';
import { Router } from '@angular/router';
import { PeriodSelectComponent } from './ui/period-select/period-select.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [GreetingsComponent, UserAvatarComponent, PeriodSelectComponent],
  template: `
    <app-greetings [name]="user()?.firstName" />
    <app-period-select />
    <app-user-avatar [user]="user()" (logout)="onLogout()" />
  `,
  host: {
    class: 'flex justify-between items-center',
  },
})
export class ToolbarComponent {
  private router = inject(Router);
  private authState = inject(AuthState);

  user = computed(() => this.authState.user.value() ?? undefined);

  onLogout() {
    this.authState.logout();
    this.router.navigate(['/public']);
  }
}
