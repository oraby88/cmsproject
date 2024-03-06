import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
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
import { PasswordDirective } from '../password.directive';
import { PopupComponent } from '../../../shared/popup/popup.component';

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
    PopupComponent
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
export class SignupComponent implements OnInit, DoCheck, AfterViewInit {
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
  signUpRequest: ISignupRequest = {} as ISignupRequest;


  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _Router: Router,
    private element: ElementRef
  ) { }

  ngAfterViewInit(): void { }

  ngDoCheck(): void {
    this.numberLength = /.{8,}/.test(this.formInfo.controls.password.value!);
    this.uppercase = /[A-Z]/.test(this.formInfo.controls.password.value!);
    this.specialChar = /[#?!@$%^&*-]/.test(
      this.formInfo.controls.password.value!
    );
    this.Number = /[0-9]/.test(this.formInfo.controls.password.value!);
  }

  formInfo = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
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
            Validators.minLength(2),
            Validators.maxLength(60),
            Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')

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
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.validateAreEqual('password', 'confirmPassword') }
    );
  }

  slidIndex: number = 0;

  public slides: string[] = [
    '../../../assets/images/illustration.png',
    '../../../assets/images/Frame 1000016152.svg',
  ];

  errorExit: boolean = false;

  Submit() {
    //this.submitted = true;
    if (this.formInfo.invalid) {
      return;
    }
    const fv = this.formInfo.value!;
    this.signUpRequest = {
      fullName: fv.fullName?.toString() ?? '',
      email: fv.email?.toString() ?? '',
      password: fv.password?.toString() ?? '',
      confirmPassword: fv.confirmPassword?.toString() ?? ''
    }
    console.log(this.signUpRequest);
    this._authService.signUp(this.signUpRequest).subscribe({
      next: (res) => {
        console.log(res);
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('email', res.email);
        this._Router.navigateByUrl('/signupverification');
        // this._authService.setTokenInSessionStorage(res['token']);
      },
      error: (err) => {
        this.errorExit = true;
        console.log(this.errorExit);

        console.log(err);
        // alert("Email already exit");
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
    console.log(event);

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
    console.log(str);
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

  removeAlreadyExistError() {
    this.errorExit = false;
  }

  // changeErrorExit(){
  //   this.errorExit = false;
  // }
}

