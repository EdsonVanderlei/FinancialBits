import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormBaseDirective } from '../../../directives/form-base.directive';
import { FormFieldDirective } from '../../../../shared/directives/form-field.directive';
import { Category } from '../../../types/category/category';
import { colors } from '../../../utils/colors';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    FormFieldDirective,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent extends FormBaseDirective<Category> {
  colors = colors

  override form = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    color: ['', Validators.required],
  });

  protected override handleForm = (value?: Partial<Category>) => {
    this.form.reset();
    this.form.setValue({
      id: value?.id ?? null,
      name: value?.name ?? null,
      color: value?.color ?? null,
    });
  };

  protected override validationCallback = (value?: Partial<Category>) =>
    !!value?.name && !!value?.color;
}
