import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';


export interface CardData {
  state: "default" | "flipped" | "matched";
}


@Component({
  selector: 'app-sendmail',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sendmail.component.html',
  styleUrl: './sendmail.component.css',
  // animations: [
  //   trigger('flipInOut', [
  //     transition(':enter', [
  //       animate('0.5s', style({ transform: 'rotateY(90deg)' })),
  //     ]),
  //     transition(':leave', [
  //       animate('0.5s', style({ transform: 'rotateY(180deg)' })),
  //     ]),
  //   ]),
  // ],
  animations: [
    trigger("cardFlip", [
      state(
        "*",
        style({
          transform: "rotateY(270deg)"
        })
      ),
      state(
        "flipped",
        style({
          transform: "rotateY(360deg)"
        })
      ),
      transition("* <=> flipped", [animate("1000ms")]),
    ])
  ]
})
export class SendmailComponent implements OnInit {

  data: CardData = {
    state: "flipped"
  };

  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private _Router: Router) { }


  ngOnInit(): void {
    this.formSendMail = this.formBuilder.group({
      forgetEmail: ['', [Validators.required, Validators.email]],
    });

  }

  formSendMail = new FormGroup({
    forgetEmail: new FormControl(''),
  });


  resetSubmit() { // send mail
    if (this.formSendMail.invalid) {
      console.log(this.formSendMail);
      return;
    }
    const email = this.formSendMail.controls.forgetEmail.value?.toString() ?? '';
    this._authService.sendMail(email).subscribe({
      next: (res) => {
        // sessionStorage.setItem('token' , res.token);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('message', res.message);
        console.log(res);
        this._Router.navigateByUrl('/emailverification');
      }, error: (err) => {
        console.log(err);
      }
    })
    // this._authService.sendMail(email).subscribe({
    //   next: (res)=>{ 
    //     sessionStorage.setItem('token' , res.token);
    //     sessionStorage.setItem('email' , res.email);
    //     sessionStorage.setItem('message',res.message);
    //     console.log(this.formSendMail.controls.forgetEmail.value);

    //     console.log(res.message);
    //     console.log(res.token)
    //     console.log(res);

    //     this._Router.navigateByUrl('/emailverification');
    // },
    //   error:(err)=>{alert(err.message)}
    // });
  }

  ngOnDestroy(): void {
    this.data.state = "default";
  }

}
