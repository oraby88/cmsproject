import { Component } from '@angular/core';

@Component({
  selector: 'app-manageroles',
  standalone: true,
  imports: [],
  templateUrl: './manageroles.component.html',
  styleUrl: './manageroles.component.css'
})
export class ManageRolesComponent {
 isShown:boolean=false;

 show(){
  if(this.isShown==true)
{
  this.isShown=false;

}
else{
  this.isShown=true;
}
 }
}
