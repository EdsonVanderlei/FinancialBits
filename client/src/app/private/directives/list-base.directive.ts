import { Directive, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { first, Observable } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appListPageBase]',
})
export abstract class ListBaseDirective<T extends { id: string }> {
  loading = signal(false);
  formTitle?: string;
  formVisible = false;
  formValue?: Partial<T> = {};

  protected confirmationService = inject(ConfirmationService);

  abstract baseTitle: string;

  protected abstract createCallback: (value: Partial<T>) => Observable<any>;
  protected abstract updateCallback: (value: Partial<T>) => Observable<any>;
  protected abstract deleteCallback: (value: T) => Observable<any>;

  onCreate() {
    this.formTitle = `Criar ${this.baseTitle}`;
    this.formValue = {};
    this.formVisible = true;
  }

  onUpdate(value: T) {
    this.formTitle = `Atualizar ${this.baseTitle}`;
    this.formValue = { ...value };
    this.formVisible = true;
  }

  onDelete(value: T) {
    this.confirmationService.confirm({
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      message: 'Tem certeza de que deseja excluir o item selecionado?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.loading.set(true);
        this.deleteCallback(value)
          .pipe(first())
          .subscribe(() => this.loading.set(false));
      },
    });
  }

  onSave(value?: Partial<T>) {
    if (!value) return;
    this.loading.set(true);
    this[!!value.id ? 'updateCallback' : 'createCallback'](value)
      .pipe(first())
      .subscribe(() => {
        this.closeForm();
        this.loading.set(false);
      });
  }

  closeForm() {
    this.formValue = {};
    this.formVisible = false;
  }
}
