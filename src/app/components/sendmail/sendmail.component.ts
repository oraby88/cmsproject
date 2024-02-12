import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { error } from 'console';

@Component({
  selector: 'app-sendmail',
  standalone: true,
  imports: [RouterModule, FormsModule , ReactiveFormsModule , CommonModule ],
  templateUrl: './sendmail.component.html',
  styleUrl: './sendmail.component.css',
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
export class SendmailComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private _authService:AuthService ,private _Router:Router){}


  ngOnInit(): void {

    this.formSendMail = this.formBuilder.group({
      forgetEmail: ['', [Validators.required , Validators.email]],
    });

  }

  formSendMail = new FormGroup({
    forgetEmail : new FormControl(''),
  });


  resetSubmit() { // send mail
    if (this.formSendMail.invalid) {
      console.log(this.formSendMail);
      return;
    }

    this._authService.signIn(this.formSendMail.value).subscribe({
      next: ()=>{ this._Router.navigateByUrl('/emailverification')},
      error:(err)=>{alert(err.message)}
    });
  }

}
