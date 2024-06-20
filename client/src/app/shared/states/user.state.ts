import { Injectable, Signal } from '@angular/core';
import { State } from '../classes/state';
import { User } from '../models/user';
import { StorageState } from '../classes/storage-state';

@Injectable({
  providedIn: 'root',
})
export class UserState extends StorageState<User> {
  constructor() {
    super('user');
  }
}
