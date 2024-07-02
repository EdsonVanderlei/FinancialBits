import { Directive } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'h1[appTitle]',
  host: { class: 'm-0 text-3xl font-bold' },
})
export class TitleDirective {}
