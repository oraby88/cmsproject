import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPassword]',
  standalone: true,
})
export class PasswordDirective {
  lastInputTime: number = 2000;
  @Input('appPassword') currentPasswordType!: Boolean;
  constructor(private ele: ElementRef) { }

  @HostListener('input') onInput() {
    if (!this.currentPasswordType) {
      const input = this.ele.nativeElement as HTMLInputElement;
      input.type = 'text';
      setTimeout(() => {
        input.type = 'password';
      }, 1000);
    }
  }
  // private showLastCharachter(input = this.ele.nativeElement as HTMLInputElement, value:string){
  //   const lastChar = value.charAt(value.length - 1);
  //   input.type = 'text';
  //   input.value = lastChar;
  //   setTimeout(() => {
  //     input.type = 'password';
  //     input.value = value;
  //   }, 1000);
  // }

  // private hideCharachters(input = this.ele.nativeElement as HTMLInputElement, value:string){
  //   input.type = 'password'
  //   input.value = value;
  // }
}
