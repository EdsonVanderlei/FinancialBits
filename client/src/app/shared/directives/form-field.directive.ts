import {
  AfterContentInit,
  Directive,
  ElementRef,
  HostBinding,
  inject,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: 'div[appFormField]',
})
export class FormFieldDirective implements AfterContentInit {
  private element: ElementRef<HTMLDivElement> = inject(ElementRef);

  @HostBinding('class') get classes() {
    return 'grid gap-1';
  }

  ngAfterContentInit() {
    let label: HTMLLabelElement | undefined;

    for (let i = 0; i < this.element.nativeElement.children.length; i++) {
      const element = this.element.nativeElement.children[i];
      if (element.tagName.toLowerCase() !== 'label') continue;

      label = element as HTMLLabelElement;
      break;
    }

    if (!label) return;

    label.classList.add('text-xs', 'ml-1', 'text-neutral-500');
  }
}
