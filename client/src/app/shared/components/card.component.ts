import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [NgClass],
  template: `
    <div
      class="flex flex-col rounded border border-solid border-neutral-800 bg-neutral-900 p-4"
      [ngClass]="styleClass()"
      [style.padding]="padding()"
      [style.border]="border()"
      [style.background-color]="backgroundColor()"
    >
      @if (header(); as header) {
        <span class="mb-4 inline-block text-lg font-semibold">{{
          header
        }}</span>
      }
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  header = input<string>();
  padding = input<string>('1rem');
  border = input<string>();
  backgroundColor = input<string>();
  styleClass = input<string>();
}
