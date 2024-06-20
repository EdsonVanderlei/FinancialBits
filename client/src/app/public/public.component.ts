import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styles: `
    :host{
      height: 100%;
      margin: 0 auto;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
})
export class PublicComponent {}
