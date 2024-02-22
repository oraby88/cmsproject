import { Component } from '@angular/core';
import { FormGroup ,FormControl, ReactiveFormsModule  ,Validators} from '@angular/forms';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  isavailable:boolean=true;


  addUser:FormGroup =new FormGroup({
    fullName:new FormControl(null ,[Validators.required]),
    email:new FormControl(null, [Validators.required]),
    password: new FormControl(null),
    confirmPassword: new FormControl(null),
    roleId: new FormControl(null),
    profileImagePath:new FormControl(null),
  })



  AddUser(addUser:FormGroup){
    console.log(addUser)

  }




  close()
  {
   this.isavailable=false;
  }

}
