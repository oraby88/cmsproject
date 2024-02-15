import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DoCheck,
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
import { faFilm, faEye } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AuthService } from '../../../services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ISignupRequest } from '../../../interfaces/signupinterface';

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
  submitted = false;
  passwordHint: boolean = false;
  eyeshow: boolean = false;
  uppercase: boolean = false;
  specialChar: boolean = false;
  Number: boolean = false;
  numberLength: boolean = false;
  signUpRequest:ISignupRequest= {} as ISignupRequest;


  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _Router: Router
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
      }
    };
  }

  // match() {
  //   if (
  //     this.formInfo.controls.password.value ===
  //     this.formInfo.controls.confirmPassword.value
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  ngOnInit(): void {
    this.formInfo = this.formBuilder.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(16),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(40),
            Validators.minLength(6),
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.validateAreEqual('password', 'confirmPassword') }
    );

    // const password = document.getElementsByClassName('passwordCheck');

    // const mediumBar = document.getElementById('medium');
    // const strongBar = document.getElementById('strong');

    // if (password?.length < 5) {
    //   document.getElementById('week')!.style.flexGrow = '1';
    //   document.getElementById('medium')!.style.flexGrow = 'none';
    //   document.getElementById('strong')!.style.flexGrow = 'none';
    //   console.log(password.length);
    // } else if (password.length > 5 && password.length < 15) {
    //   document.getElementById('week')!.style.flexGrow = 'none';
    //   document.getElementById('medium')!.style.flexGrow = '1';
    //   document.getElementById('strong')!.style.flexGrow = 'none';
    // } else if (password.length > 15) {
    //   document.getElementById('week')!.style.flexGrow = 'none';
    //   document.getElementById('medium')!.style.flexGrow = 'none';
    //   document.getElementById('strong')!.style.flexGrow = '1';
    // }
  }

  slidIndex: number = 0;

  public slides: string[] = [
    '../../../assets/images/illustration.png',
    '../../../assets/images/Frame 1000016152.svg',
  ];
  
  Submit() {
    //this.submitted = true;
    if (this.formInfo.invalid) {
      console.log(this.formInfo);
      return;
    }
    const fv = this.formInfo.value!;
    this.signUpRequest = {
      fullName :fv.fullName?.toString()??'',
      email :fv.email?.toString()??'',
      password :fv.password?.toString()??'',
      confirmPassword :fv.confirmPassword?.toString()??''
    }
    console.log(fv);
    this._authService.signUp(this.signUpRequest).subscribe({
      next:(res)=>{
        console.log(res);
        sessionStorage.setItem('token' , res.token);
        sessionStorage.setItem('email' , res.email);
        this._Router.navigateByUrl('/signupverification');
        // this._authService.setTokenInSessionStorage(res['token']);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  showSlides(i = this.slidIndex) {
    //   let i = 0;
    //   const slideId = document.getElementById('mySlide');
    //   const slides =document.getElementsByClassName('mySlides');
    //   const dots = document.getElementsByClassName('dot');
    //   if(n > slides.length){
    //     this.slidIndex = 1
    //   }
    //   if(n < slides.length){
    //     this.slidIndex = slides.length;
    //   }
    //   for(i=0;i < slides.length ; i++){
    //     slides[i].classList.toggle('active');
    //   }
    // }
    // if (this.slidIndex == 1) {
    // document.getElementById('inside')!.style.display = 'none';
    // document.getElementById('dot2')!.className = 'active-dot';
    // document.getElementById('dot1')!.className = 'dot';
    // } else {
    // document.getElementById('inside')!.style.display = 'flex';
    // document.getElementById('dot2')!.className = 'dot';
    // document.getElementById('dot1')!.className = 'active-dot';
    // }

    let silde = this.slides[i];
    return silde;
  }
  // nextSlides() {
  //   this.slidIndex += 1;
  //   if (this.slidIndex == 2) {
  //     this.slidIndex = 0;
  //   }

  //   return this.showSlides();
  // }
  // prevSlides() {
  //   this.slidIndex -= 1;
  //   if (this.slidIndex == -1) {
  //     this.slidIndex = 1;
  //   }
  //   return this.showSlides();
  // }
  currentSlide(i: number) {
    console.log(i);
    this.slidIndex = i;
    return this.showSlides();
  }

  test() {
    this.passwordHint = !this.passwordHint;
    console.log(this.passwordHint);
  }

  eyeShow() {
    this.eyeshow = !this.eyeshow;
  }
}
