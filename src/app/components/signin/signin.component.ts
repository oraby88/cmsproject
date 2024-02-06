import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, FormsModule , ReactiveFormsModule , CommonModule ],
  templateUrl: './signin.component.html', 
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {

  Index:number = 1;
  submitted: boolean = false;
  constructor(private formBuilder:FormBuilder){}

  formInfo = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    forgetEmail : new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    verificationCode : new FormControl(''),
  });


  match(){
    if(this.formInfo.controls.password.value == this.formInfo.controls.confirmPassword.value){
      return true;
    }else{
      return false;
    }
  }


  ngOnInit(): void {
    this.formInfo = this.formBuilder.group({
      fullName: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(16)]],
      email: ['', [Validators.required , Validators.email]],
      forgetEmail: ['', [Validators.required , Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(6),
          Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      verificationCode : ['' , Validators.required],
    });
  }


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
  resetPass(){
    this.Index = 3 ;
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
}
