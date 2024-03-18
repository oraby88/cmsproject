import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit{

  
  constructor(private _BreadCurmb: BreadcrumbService) { }

  ngOnInit() {
      this._BreadCurmb.changeCurrentPath();
  }


}
