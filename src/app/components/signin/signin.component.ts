import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, FormsModule , ReactiveFormsModule , CommonModule ],
  templateUrl: './signin.component.html', 
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit,DoCheck {

  Index:number = 1;
  submitted: boolean = false;
  passwordHint: boolean = false;
  eyeshow: boolean = false;
  uppercase: boolean = false;
  specialChar: boolean = false;
  Number: boolean = false;
  numberLength: boolean = false;



  constructor(private formBuilder:FormBuilder,private _authService:AuthService , private _Router:Router){}

  formInfo = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  formSendMail = new FormGroup({
    forgetEmail : new FormControl(''),
  });

  formVerification = new FormGroup({
    verificationCode1 : new FormControl(''),
    verificationCode2 : new FormControl(''),
    verificationCode3 : new FormControl(''),
    verificationCode4 : new FormControl(''),
    verificationCode5 : new FormControl(''),
    verificationCode6 : new FormControl(''),
  });

  formSetNewPassword = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  

  validateAreEqual(pass:string , confimPass:string) {
    return (group:FormGroup) => {
      const password = group.controls[pass];
      const confimPassword = group.controls[confimPass];
      if(password.value !== confimPassword.value){
        confimPassword.setErrors({passwordMismatch: true});
      }
    }
  }


  match(){
    if(this.formInfo.controls.password.value == this.formSetNewPassword.controls.confirmPassword.value){
      return true;
    }else{
      return false;
    }
  }
  ngDoCheck(): void {
    this.numberLength = /.{8,}/.test(this.formSetNewPassword.controls.password.value!);
    this.uppercase = /[A-Z]/.test(this.formSetNewPassword.controls.password.value!);
    this.specialChar = /[#?!@$%^&*-]/.test(
      this.formSetNewPassword.controls.password.value!
    );
    this.Number = /[0-9]/.test(this.formSetNewPassword.controls.password.value!);
  }


  ngOnInit(): void {
    this.formInfo = this.formBuilder.group({
      email: ['', [Validators.required , Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(6),
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
        ],
      ],
      
    });
    
    this.formSendMail = this.formBuilder.group({
      forgetEmail: ['', [Validators.required , Validators.email]],
    });

    this.formVerification = this.formBuilder.group({
      verificationCode1 : ['' , [Validators.required,Validators.maxLength(1)]],
      verificationCode2 : ['' , [Validators.required,Validators.maxLength(1)]],
      verificationCode3 : ['' , [Validators.required,Validators.maxLength(1)]],
      verificationCode4 : ['' , [Validators.required,Validators.maxLength(1)]],
      verificationCode5 : ['' , [Validators.required,Validators.maxLength(1)]],
      verificationCode6 : ['' , [Validators.required,Validators.maxLength(1)]]
    });

    this.formSetNewPassword = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(6),
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },{validator:this.validateAreEqual("password","confirmPassword")});

  }


  Submit() { //login
    this.submitted = true;
    if (this.formInfo.invalid) {
      console.log(this.formInfo);
      return;
    }
    this._authService.signIn(this.formInfo.value).subscribe((response) => {
      if (response.message == 'success') {
        localStorage.setItem('token',response.token);
        this._Router.navigateByUrl('/home');
      }else{
        alert(response.message);
      }
    });
  }

  resetSubmit() { // send mail
    if (this.formSendMail.invalid) {
      console.log(this.formInfo);
      return;
    }
    this.showVerification();
    this._authService.signIn(this.formInfo.value).subscribe((response) => {
      if (response.message == 'success') {
        localStorage.setItem('token',response.token);
        this.showVerification();
      }else{
        alert(response.message);
      }
    });
  }

  verificationSubmit() { // send mail
    if (this.formVerification.invalid) {
      console.log(this.formVerification);
      return;
    }
    this.showSetNewPass();
    this._authService.signIn(this.formVerification.value).subscribe((response) => {
      if (response.message == 'success') {
        localStorage.setItem('token',response.token);
        this.showSetNewPass();
      }else{
        alert(response.message);
      }
    });
  }

  setNewPassword(){
    if (this.formSetNewPassword.invalid) {
      console.log(this.formSetNewPassword);
      return;
    }
    this.showChangePass()
    this._authService.signIn(this.formSetNewPassword.value).subscribe((response) => {
      if (response.message == 'success') {
        localStorage.setItem('token',response.token);
        this.showChangePass();
      }else{
        alert(response.message);
      }
    });
  }

  flipCotainer = document.getElementById('loginContainerId');
  loginCotainerId = document.getElementById('loginContainerId');
  resetCotainerId = document.getElementById('resetContainerId');
  showForgetPassForm() {
    document.getElementById('resetContainerId')?.classList.add('flip-out');
    // flipCotainer?.s
    // this.flipCotainer?.classList.add('flip');
    // this.loginCotainerId?.style.display != 'none';
    // this.resetCotainerId?.style.display != 'block';
    // console.log('flip');
    this.Index = 2 ;
  }
  
  showLoginin(){
    
    this.Index = 1 ;
  }
  showVerification(){
    this.Index = 3;
  }
  showSetNewPass(){
    this.Index = 4;
  }
  showChangePass(){
    this.Index = 5;
  }
  showLogout(){
    this.Index = 6;
  }


  test() {
    this.passwordHint = !this.passwordHint;
    console.log(this.passwordHint);
  }

  eyeShow() {
    this.eyeshow = !this.eyeshow;
  }
}
