import { Component, OnInit } from '@angular/core';
import { PaginatorComponent } from '../paginator/paginator.component';
import { userInfo } from '../../interfaces/user-info';
import { UserManagementsService } from '../../services/user-managements/user-managements.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  headdata:string[] = ['User ID',"USer info","Status","Role name","Email","Joind at"];
  bodydata!: userInfo[];
  // bodydata:any = [
  //   {id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Active',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'},
  // {id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Deactive',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'},
  // {id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Pending',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'},{id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Active',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'},
  // {id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Deactive',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'},
  // {id:'#U-101',info:{path:'../../../assets/images/table-demo-image.jpg',name:'Will Smith'},status:'Pending',role:'Super admin',email:'mahmoudsmohammed24@gmail.com',date:'11:43 am-18jun,2024'}];
  
  constructor(private userManageServ:UserManagementsService){}

  ngOnInit(): void {
    this.userManageServ.getAllUsers().subscribe(res=>{
      this.bodydata = res;
    },err=>{
      console.log(err,"from table");
    })
  }

  getCount(e:number){
    console.log(e);
  }

}
