import { Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { Category } from '../types/category/category';
import {
  CreateCategoryAction,
  DeleteCategoryAction,
  UpdateCategoryAction,
} from '../types/category/category-actions';
import { BaseService } from '../../shared/classes/base-service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseService {
  protected override baseEndpoint = '/categories';

  getAll() {
    return this.http.get<Category[]>(this.baseUrl).pipe(
      first(),
      map((wallets) => wallets.map(this.handleDate)),
    );
  }

  create(values: CreateCategoryAction) {
    return this.http
      .post<Category>(this.baseUrl, values)
      .pipe(first(), map(this.handleDate));
  }

  update(values: UpdateCategoryAction) {
    return this.http
      .post<Category>(`${this.baseUrl}/${values.id}`, values)
      .pipe(first(), map(this.handleDate));
  }

  delete(values: DeleteCategoryAction) {
    return this.http.delete<void>(`${this.baseUrl}/${values.id}`).pipe(
      first(),
      map(() => values.id),
    );
  }

  private handleDate = (category: Category): Category => ({
    ...category,
    createdAt: new Date(category.createdAt),
    updatedAt: new Date(category.updatedAt),
  });
}
