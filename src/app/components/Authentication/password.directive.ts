import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPassword]',
  standalone: true
})
export class PasswordDirective {
  private lastInputTime: number = 1000;
  private timeoutTemp: any = undefined;
  private tempInput: string = '';
  private currentInput: string = '';
  private timeoutFlag: boolean = false;

  @Input('appPassword') currentPasswordType!: boolean;

  constructor(private ele: ElementRef) { }

  @HostListener('input') onInput() {
    const input = this.ele.nativeElement as HTMLInputElement;

    if (this.timeoutTemp) {
      clearTimeout(this.timeoutTemp);
      // this.timeoutFlag = true;
      // input.value = this.currentInput;
      input.type = 'password';
    }

    // if (!this.timeoutFlag) {
    //   this.currentInput = input.value;
    // }

    // if (this.timeoutFlag) {
    //   this.currentInput = this.currentInput.concat(input.value.slice(-1));
    // }

    if (!this.currentPasswordType) {
      // input.value = this.tempInput
      //   .concat('*')
      //   .repeat(input.value.length - 1)
      //   .concat(input.value.slice(-1));
      input.type = 'text';

      this.timeoutTemp = setTimeout(() => {
        // input.value = this.currentInput;
        input.type = 'password';
      }, this.lastInputTime);
    }
  }
}