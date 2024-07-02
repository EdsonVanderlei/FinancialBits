import { Directive } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'h2[appSubtitle]',
  host: { class: 'm-0 text-xl font-bold' },
})
export class SubtitleDirective {}
