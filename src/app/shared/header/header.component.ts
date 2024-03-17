import { CommonModule, LocationStrategy, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';


import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { UserProfileComponent } from '../../components/core/user-profile/user-profile.component';
import { CardModalComponent } from '../pop-up-card/card-modal/card-modal.component';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../interfaces/app-user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleCasePipe, UpperCasePipe, UserProfileComponent, RouterOutlet, RouterModule, RouterLink, FormsModule, CardModalComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  notification_status!: Boolean
  toggleUserMenu!: Boolean
  user!: AppUser;
  fullPath!: string[];

  constructor(private _BreadCurmb: BreadcrumbService, private _AuthService: AuthService) {
    this.notification_status = false;
    this.toggleUserMenu = false;

  }

  ngOnInit(): void {
    this._AuthService.getUser().subscribe({
      next: (usr) => {
        this.user = usr
      },
      error: (usrError) => {
        console.log(usrError);
      }
    })
    this._BreadCurmb.changeCurrentPath();
    this._BreadCurmb.getCurrentPath().subscribe({
      next: (res: string[]) => {
        this.fullPath = res.splice(1);
      }
    })
  }

  search(event: any) {
    if (event.target.value > 3)
      console.log(event.target.value);
  }

  userMenuToggled() {
    this.toggleUserMenu = !this.toggleUserMenu;
  }

  logout() {
    this._AuthService.logout();
  }

}
