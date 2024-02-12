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
import { animate, style, transition, trigger } from '@angular/animations';
import { ResetPasswordService } from '../../services/reset-password.service';


@Component({
  selector: 'app-setnewpassword',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './setnewpassword.component.html',
  styleUrl: './setnewpassword.component.css',
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
export class SetnewpasswordComponent implements OnInit, DoCheck {
  eyeshow: boolean = false;
  passwordHint: boolean = false;
  uppercase: boolean = false;
  specialChar: boolean = false;
  Number: boolean = false;
  numberLength: boolean = false;

  formSetNewPassword = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private _authService: ResetPasswordService,

    private _Router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngDoCheck(): void {
    this.numberLength = /.{8,}/.test(
      this.formSetNewPassword.controls.password.value!
    );
    this.uppercase = /[A-Z]/.test(
      this.formSetNewPassword.controls.password.value!
    );
    this.specialChar = /[#?!@$%^&*-]/.test(
      this.formSetNewPassword.controls.password.value!
    );
    this.Number = /[0-9]/.test(
      this.formSetNewPassword.controls.password.value!
    );
  }

  ngOnInit(): void {
    this.formSetNewPassword = this.formBuilder.group(
      {
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
  }

  setNewPassword() {
    if (this.formSetNewPassword.invalid) {
      console.log(this.formSetNewPassword);
      return;
    }
    // this.showChangePass()
    this._authService.resetPassword(this.formSetNewPassword.controls.password.value! , this.formSetNewPassword.controls.confirmPassword.value!).subscribe({
      next: (res) => {

        
        this._Router.navigateByUrl('/correctchange');
        
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  validateAreEqual(pass: string, confimPass: string) {
    return (group: FormGroup) => {
      const password = group.controls[pass];
      const confimPassword = group.controls[confimPass];
      if (password.value !== confimPassword.value) {
        confimPassword.setErrors({ passwordMismatch: true });
      }
    };
  }

  test() {
    this.passwordHint = !this.passwordHint;
    console.log(this.passwordHint);
  }

  eyeShow() {
    this.eyeshow = !this.eyeshow;
  }
}
