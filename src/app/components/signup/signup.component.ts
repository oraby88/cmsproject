import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { get } from 'node:http';
import { RouterModule } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';

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
})
export class SignupComponent implements OnInit, DoCheck, AfterViewInit {
  [x: string]: any;
  filmIcon = faFilm;
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  submitted = false;
  passwordHint:boolean=false;
  constructor(private formBuilder: FormBuilder) {}
  ngAfterViewInit(): void {
  }

  ngDoCheck(): void { }

  formInfo = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  match() {
    if (
      this.formInfo.controls.password.value ==
      this.formInfo.controls.confirmPassword.value
      // this.formInfo.controls.password.untouched
    ) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit(): void {
    this.formInfo = this.formBuilder.group({
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
    });

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

  // get f(): { [key: string]: AbstractControl } {
  //   return this.formInfo.controls;
  // }

  public slides: string[] = [
    '../../../assets/images/illustration (1).svg',
    '../../../assets/images/Frame 1000016152.svg',
  ];

  Submit() {
    this.submitted = true;
    if (this.formInfo.invalid) {
      return;
    }
    console.log(JSON.stringify(this.formInfo.value, null, 2));

    console.log(this.formInfo.value);
  }
  Reset(): void {
    this.submitted = false;
    this.formInfo.reset();
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
    if (this.slidIndex == 1) {
      document.getElementById('inside')!.style.display = 'none';
      document.getElementById('dot2')!.className = 'active-dot';
      document.getElementById('dot1')!.className = 'dot';
    } else {
      document.getElementById('inside')!.style.display = 'flex';
      document.getElementById('dot2')!.className = 'dot';
      document.getElementById('dot1')!.className = 'active-dot';
    }

    // if()
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

  test (){
    this.passwordHint = !this.passwordHint;    
    console.log(this.passwordHint);
    
  }
  
}
