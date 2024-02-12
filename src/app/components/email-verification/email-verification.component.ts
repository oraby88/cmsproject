import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css',
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
export class EmailVerificationComponent implements OnInit {


  formVerification = new FormGroup({
    verificationCode1 : new FormControl(''),
    verificationCode2 : new FormControl(''),
    verificationCode3 : new FormControl(''),
    verificationCode4 : new FormControl(''),
    verificationCode5 : new FormControl(''),
    verificationCode6 : new FormControl(''),
  });
  constructor(private formBuilder:FormBuilder,private _authService:AuthService, private _Router: Router) {}
  ngOnInit(): void {
    this.formVerification = this.formBuilder.group({
      verificationCode1 : ['' , [Validators.required,Validators.maxLength(1)]],
      verificationCode2 : ['' , [Validators.required,Validators.maxLength(1)]],
      verificationCode3 : ['' , [Validators.required,Validators.maxLength(1)]],
      verificationCode4 : ['' , [Validators.required,Validators.maxLength(1)]],
      verificationCode5 : ['' , [Validators.required,Validators.maxLength(1)]],
      verificationCode6 : ['' , [Validators.required,Validators.maxLength(1)]]
    });
  }



  verificationSubmit() { // send mail
    if (this.formVerification.invalid) {
      console.log(this.formVerification);
      return;
    }
    // this.showSetNewPass();
    this._authService.signIn(this.formVerification.value).subscribe({
      next:(res)=>{
        this._Router.navigateByUrl('setnewpassword');
        this._authService.setToken(res.token);
        // this.showSetNewPass();
      },
      error:err=>{
        alert(err.message);
      }
    });
  }

}
