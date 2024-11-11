import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { CardComponent } from '../../../shared/components/card.component';
import { FormFieldDirective } from '../../../shared/directives/form-field.directive';
import { ListBaseDirective } from '../../directives/list-base.directive';
import { CategoriesState } from '../../states/categories.state';
import { Category } from '../../types/category/category';
import { CategoryFormComponent } from './category-form/category-form.component';

@Component({
  selector: 'app-categories-filter',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    MultiSelectModule,
    CardComponent,
    CategoryFormComponent,
    FormFieldDirective,
  ],
  providers: [ConfirmationService],
  templateUrl: './categories-filter.component.html',
  styleUrl: './categories-filter.component.scss',
})
export class CategoriesFilterComponent extends ListBaseDirective<Category> {
  private categoriesState = inject(CategoriesState);

  @ViewChild('multiSelect') multiSelect?: MultiSelect;

  override baseTitle = 'Categorias';
  categories = this.categoriesState.categories;
  selectedCategories = this.categoriesState.selectedCategories;

  onEvent(event: Event) {
    event.stopPropagation();
    this.multiSelect?.close(event);
  }

  selectedCategoriesChange(event: string[]) {
    this.categoriesState.setSelectedCategories(event);
  }

  override createCallback = (value: Partial<Category>) =>
    this.categoriesState.create({ name: value.name!, color: value.color! });

  override updateCallback = (value: Partial<Category>) =>
    this.categoriesState.update({
      id: value.id!,
      name: value.name,
      color: value.color,
    });

  override deleteCallback = (value: Category) =>
    this.categoriesState.delete({ id: value.id });
}
