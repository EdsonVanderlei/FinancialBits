import { Component, computed, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-greetings',
  template: `<h1 class="m-0">{{ greetings() }}</h1>`,
})
export class GreetingsComponent {
  firstName = input<string>();

  greetings = computed(() => {
    let greetings = '';
    const name = this.firstName();
    const hours = new Date().getHours();

    if (hours < 12) greetings = 'Good morning';
    else if (hours < 18) greetings = 'Good afternoon';
    else greetings = 'Good evening';

    if (name) greetings += `, ${name}`;

    return greetings;
  });
}
