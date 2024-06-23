import { Component, computed, inject, input, output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { User } from '../../../../shared/types/user';

@Component({
  standalone: true,
  selector: 'app-user-avatar',
  imports: [
    AvatarModule,
    ButtonModule,
    OverlayPanelModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  template: `
    <p-avatar shape="circle">
      <p-button [label]="initials()" (click)="op.toggle($event)"></p-button>
    </p-avatar>

    <p-confirmDialog />

    <p-overlayPanel #op>
      <div class="flex gap-8">
        <div class="grid">
          <span>{{ fullname() }}</span>
          <small [style.color]="'var(--text-color-secondary)'">
            {{ user()?.email }}
          </small>
        </div>
        <p-button
          text
          severity="danger"
          icon="pi pi-power-off"
          (onClick)="onLogout($event)"
        ></p-button>
      </div>
    </p-overlayPanel>
  `,
})
export class UserAvatarComponent {
  private confirmationService = inject(ConfirmationService);

  user = input<User>();
  fullname = computed(() =>
    `${this.user()?.firstName} ${this.user()?.lastName}`.trim()
  );
  initials = computed(
    () =>
      this.fullname() &&
      this.fullname()
        .split(' ')
        .map((str) => str.charAt(0))
        .join('')
  );

  logout = output<void>();

  onLogout(event: MouseEvent) {
    this.confirmationService.confirm({
      target: event.target!,
      icon: 'pi pi-exclamation-triangle',
      header: 'Logout Confirmation',
      message: 'Do you want to logout your account?',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => this.logout.emit(),
    });
  }
}
