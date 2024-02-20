import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  notification_status!: Boolean

  constructor() {
    this.notification_status = false;
  }

  ngOnInit(): void { }

  search(event: any) {
    if (event.target.value > 3)
      console.log(event.target.value);
  }

}
