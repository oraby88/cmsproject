import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { faFilm, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ISignupRequest } from '../../../interfaces/signupinterface';
import { PopupComponent } from '../../../shared/popup/popup.component';
import { PasswordDirective } from '../directives/password.directive';
import { SpinnerComponent } from '../../../shared/spinner/spinner/spinner.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    MatProgressBar,
    PasswordDirective,
    PopupComponent,
    SpinnerComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  animations: [
    trigger('flipInOut', [
      transition(':enter', [
        animate('1s', style({ transform: 'rotateY(90deg)' })),
      ]),
      transition(':leave', [
        animate('1s', style({ transform: 'rotateY(180deg)' })),
      ]),
    ]),
  ],
})
export class SignupComponent implements OnInit {
  [x: string]: any;
  filmIcon = faFilm;
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faEye = faEye;
  faEyaSlash = faEyeSlash;
  submitted = false;
  passwordHint: boolean = false;
  eyeshow: boolean = false;
  uppercase: boolean = false;
  specialChar: boolean = false;
  Number: boolean = false;
  numberLength: boolean = false;
  signUpRequest: any = {} as ISignupRequest;
  spinner!: Boolean

  // NEW FORM****************
  match: boolean = true;
  // password pass 4 validity conditions
  validity: boolean = true;
  passedHints: (boolean | number)[] = [];
  count: number = 0;
  displayPassword = false;
  displayConfirm = false;
  displayHints = false;
  hPass: string = '';
  hConf: string = '';
  // NEW FORM*****************

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _Router: Router,
    private element: ElementRef
  ) {
    this.spinner = false;
  }

  formInfo = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordHide: new FormControl(''),
    confirm: new FormControl(''),
    confirmHide: new FormControl(''),
  });
  validateAreEqual(pass: string, confimPass: string) {
    return (group: FormGroup) => {
      const password = group.controls[pass];
      const confimPassword = group.controls[confimPass];
      if (password.value !== confimPassword.value) {
        confimPassword.setErrors({ passwordMismatch: true });
      } else {
        confimPassword.setErrors(null);
      }
    };
  }

  ngOnInit(): void {
    this.formInfo = this.formBuilder.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(60),
            Validators.pattern(`^[A-Za-z\\s]*$`)

          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(40),
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        passwordHide: ['', [Validators.required,
        Validators.maxLength(40),
        Validators.minLength(8),
        ]],
        confirm: ['', [Validators.maxLength(40),
        Validators.minLength(8),
        Validators.required,]],
        confirmHide: ['', [
          Validators.maxLength(40),
          Validators.minLength(8),
          Validators.required,
        ]]
      },
      // { validator: this.validateAreEqual('password', 'confirmPassword') }
    );
  }

  slidIndex: number = 0;

  public slides: string[] = [
    'assets/images/illustration-signup.png',
    'assets/images/Frame 1000016152.svg',
  ];

  errorExit: boolean = false;

  Submit() {
    this.spinner = true;
    //this.submitted = true;
    if (this.formInfo.invalid) {
      this.spinner = false;

      return;
    }
    const fv = this.formInfo.value!;
    this.signUpRequest = {
      // fullName: fv.fullName?.toString() ?? '',
      // email: fv.email?.toString() ?? '',
      // password: fv.password?.toString() ?? '',
      // confirmPassword: fv.confirmPassword?.toString() ?? ''
    }
    console.log(this.signUpRequest);
    this._authService.signUp(this.signUpRequest).subscribe({
      next: (res) => {
        this.spinner = false;
        console.log(res);
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('email', res.email);
        this._Router.navigateByUrl('/signupverification');
      },
      error: (err) => {
        this.spinner = false;
        this.errorExit = true;
      }
    });

  }
  showConfirmPass: boolean = false
  showConfirmPassword() {
    this.showConfirmPass = !this.showConfirmPass
  }
  showPass: boolean = false;
  showPassword() {
    this.showPass = !this.showPass;
  }

  unshowPassAfter2S(event: any) {
    const ele = this.element.nativeElement as HTMLInputElement;
    setTimeout(() => {
      ele.type = 'text'
    }, 2000)
  }

  showSlides(i = this.slidIndex) {
    let silde = this.slides[i];
    return silde;
  }

  currentSlide(i: number) {
    this.slidIndex = i;
    return this.showSlides();
  }

  test() {
    this.passwordHint = !this.passwordHint;
  }

  eyeShow() {
    this.eyeshow = !this.eyeshow;
  }

  testStr: string = '';
  pwd!: string;
  signUpTest(str: any) {
    const input = this.element.nativeElement as HTMLInputElement;
    input.type = 'text';
    setTimeout(() => {
      this.testStr += `-`
      input.type = 'password'
      this.pwd += str.key;
      console.log(this.pwd);
    }, 2000);
  }

  checkPasswordLength(controlName: string) {
    if (this.formInfo.get(controlName)?.value) {
      if (+this.formInfo.get(controlName)?.value.length > 40)
        this.formInfo.get(controlName)?.patchValue(this.formInfo.get(controlName)?.value.slice(0, 40));
    }
  }

  checkFullnameLength(controlName: string) {
    if (this.formInfo.get(controlName)?.value) {
      if (+this.formInfo.get(controlName)?.value.length > 60)
        this.formInfo.get(controlName)?.patchValue(this.formInfo.get(controlName)?.value.slice(0, 60));
    }
  }

  removeAlreadyExistError() {
    this.errorExit = false;
  }

  shooww(event: any, controlName: string) {
    this.formInfo.get(controlName)?.patchValue(event)
  }







  // NEW FORM***************

  // validator function
  validPassword(pass: any) {

    this.passedHints = [];

    this.numberLength = /.{8,}/.test(pass);
    this.uppercase = /[A-Z]{1,}/.test(pass);
    this.specialChar = /[#?!@$%^&*-]{1,}/.test(
      pass
    );
    this.Number = /[0-9]{1,}/.test(pass);


    this.passedHints.push(/.{8,}/.test(pass));
    this.passedHints.push(/[A-Z]{1,}/.test(pass));
    this.passedHints.push(/[#?!@$%^&*-]{1,}/.test(
      pass
    ));
    this.passedHints.push(
      /[0-9]{1,}/.test(pass)
    );

    // count passed to define password strength
    this.count = this.passedHints.filter((e) => e).length;

    // check if all passed tests (the validity)
    this.passedHints.includes(false) === false
      ? (this.validity = true)
      : (this.validity = false);
  }

  // display last character for 3 seconds
  onEnterPassword(e: Event) {
    let showLength = 1,
      delay = 3000,
      hideAll = setTimeout(function () { }, 0);
    const password = e.target as HTMLInputElement,
      hidden = (e.target as HTMLInputElement)
        .nextElementSibling as HTMLInputElement;

    let offset = password.value.length - hidden.value.length;
    if (offset > 0) {
      hidden.value =
        hidden.value +
        password.value.substring(
          hidden.value.length,
          hidden.value.length + offset,
        );
    } else if (offset < 0) {
      hidden.value = hidden.value.substring(0, hidden.value.length + offset);
    }
    if (password.value.length > showLength) {
      password.value =
        password.value
          .substring(0, password.value.length - showLength)
          .replace(/./g, '•') +
        password.value.substring(
          password.value.length - showLength,
          password.value.length,
        );
    }
    if (password.classList.contains('pass')) {
      this.hPass = hidden.value;
    } else {
      this.hConf = hidden.value;
      // match or not
      if (this.hPass === this.hConf) {
        this.match = true;
      } else {
        this.match = false;
      }
    }
    // call function to check password validity
    this.validPassword(this.hPass);
    // Set the timer
    clearTimeout(hideAll);
    hideAll = setTimeout(function () {
      password.value = password.value.replace(/./g, '•');
    }, delay);

    console.log("method: " + this.match);

  }

  // Store Values When Password Displayed
  onDisplayedPassword(e: Event) {
    // take the value of the Displayed Password
    if ((e.target as HTMLInputElement).classList.contains('hPass')) {
      this.hPass = (e.target as HTMLInputElement).value;
      // Make number of dots equal to the length of the displayed password
      this.formInfo
        .get('password')
        ?.setValue('•'.repeat(this.hPass.length));
    } else {
      this.hConf = (e.target as HTMLInputElement).value;
      // Make number of dots equal to the length of the displayed Confirmation
      this.formInfo
        .get('confirm')
        ?.setValue('•'.repeat(this.hConf.length));
      // Compare two values to define match or not
      if (this.hPass === this.hConf) {
        // match or not
        this.match = true;
      } else {
        this.match = false;
      }
    }

    console.log("Display: " + this.match);
    // call function to check password validity
    this.validPassword(this.hPass);
  }

  // NEW FORM***************
}

