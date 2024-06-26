import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from '../../shared/states/auth.state';
import { PeriodState } from '../../shared/states/period.state';
import { PeriodEnum } from '../../shared/types/enums/period.enum';
import { GreetingsComponent } from './ui/greetings/greetings.component';
import { PeriodSelectComponent } from './ui/period-select/period-select.component';
import { UserAvatarComponent } from './ui/user-avatar/user-avatar.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [GreetingsComponent, UserAvatarComponent, PeriodSelectComponent],
  template: `
    <app-greetings [firstName]="user()?.firstName" />
    <app-period-select [period]="period()" (periodChange)="onPeriodChange($event)" />
    <app-user-avatar [fullName]="user()?.fullName" [email]="user()?.email" (logout)="onLogout()" />
  `,
  host: {
    class: 'flex justify-between items-center',
  },
})
export class ToolbarComponent {
  private router = inject(Router);
  private authState = inject(AuthState);
  private periodState = inject(PeriodState);

  period = this.periodState.current;
  user = computed(() => this.authState.user.value() ?? undefined);

  onPeriodChange(period: PeriodEnum) {
    this.periodState.setPeriod(period);
  }

  onLogout() {
    this.authState.logout();
    this.router.navigate(['/public']);
  }
}
