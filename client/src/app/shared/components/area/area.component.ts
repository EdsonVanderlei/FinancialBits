import { Component, input } from '@angular/core';
import { SubtitleDirective } from '../../directives/subtitle.directive';

@Component({
  standalone: true,
  selector: 'app-area',
  imports: [SubtitleDirective],
  template: `
    <h2 appSubtitle>{{ title() }}</h2>
    <div [class]="'p-4 ' + containerClasses()"><ng-content></ng-content></div>
  `,
  styles: `
    :host {
      height: 100%;
      display: grid;
      grid-template-rows: min-content auto;
    }
  `,
})
export class AreaComponent {
  title = input<string>();
  containerClasses = input<string>('');
}
