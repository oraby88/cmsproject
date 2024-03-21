import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ToggleService } from '../../../services/toggleBtn/toggle.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner/spinner.component';
import { InterceptorLoaderRequestService } from '../../../services/request/interceptor-loader-request.service';

@Component({
  selector: 'app-cms-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './cms-main.component.html',
  styleUrl: './cms-main.component.css'
})
export class CmsMainComponent {
  request!: Boolean;
  toggler_val!: Boolean;
  @ViewChild('header') header!: ElementRef

  constructor(private _Toggle: ToggleService, private _InterceptorLoaderRequestService: InterceptorLoaderRequestService) { }

  ngOnInit() {
    this._Toggle.getToggleValue().subscribe({
      next: (res) => {
        this.toggler_val = res;
      }
    });
    this._InterceptorLoaderRequestService.getIncomingRequests().subscribe({
      next: (res) => { this.request = res },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngAfterViewInit(): void {
    if (window.innerWidth < 992)
      this.header.nativeElement.classList.remove(['toggle', 'beforeToggle']);
  }
}
