import { Component } from '@angular/core';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  headdata:string[] = ['User ID',"USer info","Status","Role name","Email","Joind at"];
  bodydata:any = [
    {id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Active',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'},
  {id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Deactive',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'},
  {id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Pending',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'},{id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Active',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'},
  {id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Deactive',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'},
  {id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Pending',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'}];
  
  constructor(){
    
  }

  getCount(e:number){
    console.log(e);
  }

}
