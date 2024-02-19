import { Component } from '@angular/core';
import { faFilm, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
 

  isavailable:boolean=true;

  faEye = faEye;

  eyeshow: boolean = false;


  close()
  {
   this.isavailable=false;
  }
  eyeShow() {
    this.eyeshow = !this.eyeshow;
  }
}
