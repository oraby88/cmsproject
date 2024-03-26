import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';
import { SpinnerComponent } from '../../../../shared/spinner/spinner/spinner.component';
import { SettingsService } from '../services/settings.service';
import { SubscriptionPlan } from '../interfaces/subscriptionPlan';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [SpinnerComponent, CommonModule, DecimalPipe],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  subscriptionPlans!: SubscriptionPlan[];
  @ViewChild('yearly') defaultSubscriptionDuration!: ElementRef
  constructor(private _BreadCurmb: BreadcrumbService, private _SettingService: SettingsService) {
    this.subscriptionPlans = [];
  }

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();
    this._SettingService.getSubscriptionPlans().subscribe({
      next: (plans) => {
        console.log(plans);
        this.subscriptionPlans = plans;
      },
      error: () => {
      }
    })
  }

  ngAfterViewInit(): void {
    this.defaultSubscriptionDuration.nativeElement.classList.add('subscription-duration-active');
  }


  chooseSubscriptionPlanDuration(first: HTMLElement, second: HTMLElement) {
    first.classList.add('subscription-duration-active');
    second.classList.remove('subscription-duration-active');
  }

  ngOnDestroy(): void { }
}
