import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../types/category/category';
import {
  CreateCategoryAction,
  DeleteCategoryAction,
  UpdateCategoryAction,
} from '../types/category/category-actions';

@Injectable({
  providedIn: 'root',
})
export class CategoriesState {
  private categoriesService = inject(CategoriesService);

  private _categories = signal<Category[] | undefined>(undefined);
  private _selectedCategories = signal<string[] | undefined>(undefined);

  categories = computed(() => this._categories());
  selectedCategories = computed(() => this._selectedCategories());
  filteredCategories = computed(() =>
    this.categories()?.filter((_) => this.selectedCategories()?.includes(_.id)),
  );

  init() {
    this.categoriesService.getAll().subscribe({
      next: (categories) => {
        this._categories.set(categories);
        this._selectedCategories.set(categories.map((c) => c.id));
      },
      error: () => {
        this._categories.set(undefined);
        this._selectedCategories.set(undefined);
      },
    });
  }

  setSelectedCategories(value: string[]) {
    this._selectedCategories.set(value);
  }

  create(values: CreateCategoryAction) {
    return this.categoriesService
      .create(values)
      .pipe(tap((category) => this.pushCategory(category, true)));
  }

  update(values: UpdateCategoryAction) {
    return this.categoriesService
      .update(values)
      .pipe(tap((category) => this.pushCategory(category, false)));
  }

  delete(values: DeleteCategoryAction) {
    return this.categoriesService
      .delete(values)
      .pipe(tap(() => this.removeCategory(values.id)));
  }

  private pushCategory(category: Category, refreshSelected: boolean) {
    this._categories.update((categories) =>
      categories
        ?.filter((_) => _.id !== category.id)
        ?.concat(category)
        ?.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
    );
    if (refreshSelected) this.refreshSelectedCategories();
  }

  private refreshSelectedCategories() {
    const wallets = this._categories();
    const value = wallets?.map((wallet) => wallet.id);
    this._selectedCategories.set(value);
  }

  private removeCategory(id: string) {
    this._categories.update((categories) =>
      categories?.filter((_) => _.id !== id),
    );
  }
}
