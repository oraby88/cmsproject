import { Component, OnInit } from '@angular/core';
import { PaginatorComponent } from '../paginator/paginator.component';
import { userInfo } from '../../interfaces/user-info';
import { UserManagementsService } from '../../services/user-managements/user-managements.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PaginatorComponent,AsyncPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  headdata:string[] = ['User ID',"USer info","Status","Role name","Email","Joind at"];
  bodydata: userInfo[]=[
    {id:'#U-101',fullName:'mahmoud',profileImagePath:'../../../assets/images/table-demo-image.jpg',isAccountActive:true,email:'mahmoudsmohammed24@gmail.com',createdAt:'11:43 am - 18 jun,2024',roleName:'super'},
    {id:'#U-101',fullName:'mahmoud',profileImagePath:'../../../assets/images/table-demo-image.jpg',isAccountActive:true,email:'mahmoudsmohammed24@gmail.com',createdAt:'11:43 am - 18 jun,2024',roleName:'super'},
    {id:'#U-101',fullName:'mahmoud',profileImagePath:'../../../assets/images/table-demo-image.jpg',isAccountActive:true,email:'mahmoudsmohammed24@gmail.com',createdAt:'11:43 am - 18 jun,2024',roleName:'super'},
    {id:'#U-101',fullName:'mahmoud',profileImagePath:'../../../assets/images/table-demo-image.jpg',isAccountActive:true,email:'mahmoudsmohammed24@gmail.com',createdAt:'11:43 am - 18 jun,2024',roleName:'super'},{id:'#U-101',fullName:'mahmoud',profileImagePath:'../../../assets/images/table-demo-image.jpg',isAccountActive:true,email:'mahmoudsmohammed24@gmail.com',createdAt:'11:43 am - 18 jun,2024',roleName:'super'},
    {id:'#U-101',fullName:'mahmoud',profileImagePath:'../../../assets/images/table-demo-image.jpg',isAccountActive:true,email:'mahmoudsmohammed24@gmail.com',createdAt:'11:43 am - 18 jun,2024',roleName:'super'}, {id:'#U-101',fullName:'mahmoud',profileImagePath:'../../../assets/images/table-demo-image.jpg',isAccountActive:true,email:'mahmoudsmohammed24@gmail.com',createdAt:'11:43 am - 18 jun,2024',roleName:'super'},
    {id:'#U-101',fullName:'mahmoud',profileImagePath:'../../../assets/images/table-demo-image.jpg',isAccountActive:true,email:'mahmoudsmohammed24@gmail.com',createdAt:'11:43 am - 18 jun,2024',roleName:'super'}
  ];
  rows:number = 2
  ;

  constructor(private userManageServ:UserManagementsService){}

  ngOnInit(): void {
    // this.userManageServ.getAllUsers().subscribe(res=>{
    //   this.bodydata = res;
    // },err=>{
    //   console.log(err,"from table");
    // })
  }

  getCount(e:number){
    this.rows = e;
    console.log(this.rows,"rows number");
  }

  // activated selected class
  onChecked(e:Event){
    (((e.target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement).classList.toggle('selected');
  }
}
