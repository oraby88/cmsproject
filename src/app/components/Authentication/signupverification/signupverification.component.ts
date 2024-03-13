import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule, TitleCasePipe } from '@angular/common';
import { AutoFocusDirective } from '../directives/auto-focus.directive';
import { SpinnerComponent } from '../../../shared/spinner/spinner/spinner.component';
// import { SignupComponent } from '../signup/signup.component'; 

@Component({
  selector: 'app-signupverification',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TitleCasePipe,
    AutoFocusDirective,
    SpinnerComponent
  ],
  templateUrl: './signupverification.component.html',
  styleUrl: './signupverification.component.css',
})
export class SignupverificationComponent implements OnInit {
  str1!: string;
  str2!: string;
  str3!: string;
  str4!: string;
  str5!: string;
  str6!: string;
  errorExist: boolean = false;
  str: string = '';
  email!: string | undefined;
  sessionStorage!: string | undefined;
  resendOTPBool!: Boolean;
  resendOtpMsg!: string;
  spinner!: Boolean

  public slides: string[] = [
    'assets/images/verification-rightside.svg',
  ];


  formVerification = new FormGroup({
    verificationCode1: new FormControl(''),
    verificationCode2: new FormControl(''),
    verificationCode3: new FormControl(''),
    verificationCode4: new FormControl(''),
    verificationCode5: new FormControl(''),
    verificationCode6: new FormControl(''),
  });
  slidIndex: any = 0;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _Router: Router,
  ) { }
  ngOnInit(): void {
    this.email = sessionStorage?.getItem('email')?.slice(0, 4).concat("************");
    this.formVerification = this.formBuilder.group({
      verificationCode1: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode2: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode3: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode4: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode5: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode6: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }

  // signupEmail: string =
  //   this._signupComponent.formInfo.controls.email.value ?? '';

  verificationSubmit() {
    // send mail
    if (this.formVerification.invalid) {
      console.log(this.formVerification);
      return;
    }
    this.str = `${this.str1}${this.str2}${this.str3}${this.str4}${this.str5}${this.str6}`;
    console.log(this.str);
    this._authService.verificationCode(this.str).subscribe({
      next: (res) => {
        sessionStorage.clear();
        this._Router.navigateByUrl('/signin');
      },
      error: (err) => {
        this.errorExist = true;
        this.resendOTPBool = false;
      },
    });
  }

  resendOTP() {
    this.errorExist = false;
    this.resendOTPBool = true;

    this._authService.resendOTP().subscribe({
      next: (res: any) => {
        this.resendOtpMsg = res.message
      },
      error: (err) => {
        this.errorExist = false;
        this.resendOtpMsg = err.error.message;
      },
    });
  }

  removeErrorExit() {
    this.errorExist = false;
  }

  showSlides(i = this.slidIndex) {
    let silde = this.slides[i];
    return silde;
  }
}
