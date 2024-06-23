import { Injectable, computed } from '@angular/core';
import { State } from '../classes/state';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _messages = new State<Message[]>([]);
}
