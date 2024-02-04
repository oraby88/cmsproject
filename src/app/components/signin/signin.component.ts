import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  formInfo = new FormGroup({
    
    email: new FormControl(''),
    password: new FormControl(''),

  });
  submitted: boolean = false;
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.formInfo = this.formBuilder.group({
      email: ['', [Validators.required , Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(6),
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")
        ],
      ],
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

  flip(){
    let flipCotainer = document.querySelector('loginContainer');
    // let flipCotainer = document.querySelector('loginContainer');

    // flipCotainer?.s
    flipCotainer?.classList.toggle('flip');
    
  }
  




}
