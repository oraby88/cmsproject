import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class PaginatorComponent implements AfterViewChecked, OnInit {
  // component properties 
  @ViewChild('container') container!: ElementRef;
  @Output('rowsCount') rowsCount = new EventEmitter<number>();
  @Input('all') all!: number;
  pages!: number;
  active = 0;
  holder!: ElementRef;

  ngOnInit(): void {
    this.pages = Math.ceil(this.all / 2);
  }

  ngAfterViewChecked(): void {
    let holder = this.container.
      nativeElement.children;
    switch (true) {
      // more than 4 pages 
      case this.active === 0 && this.pages > 4:
        holder[0].className = 'active';
        holder[1].className = 'semi';
        holder[2].className = '';
        break;
      case this.active === 1 && this.pages > 4:
        holder[0].className = '';
        holder[1].className = 'active';
        holder[2].className = 'semi';
        break;
      case this.active > 1 && this.active < this.pages - 2 && this.pages > 4:
        holder[2].textContent = this.active;
        holder[3].textContent = this.active + 1;
        holder[4].textContent = this.active + 2;
        break;
      case this.active === this.pages - 2 && this.pages > 4:
        holder[3].className = 'active';
        holder[2].className = 'semi';
        holder[4].className = '';
        break;
      case this.active === this.pages - 1 && this.pages > 4:
        holder[2].className = '';
        holder[4].className = 'active';
        holder[3].className = 'semi';
        break;
      // less than 5 pages
      case this.pages <= 4:
        Array.from(holder).forEach((e, i) => {
          i === this.active ? (e as HTMLElement).className = "active" : i === this.active + 1 && this.active < this.pages - 1 ? (e as HTMLElement).className = "semi" : (e as HTMLElement).className = "";
        });
        break;
    }
  }

  // get number of needed display user 
  onCahnge(e: Event) {
    this.active = 0;
    this.pages = Math.ceil(this.all / +((e.target as HTMLInputElement).value));
    this.rowsCount.emit(+(e.target as HTMLInputElement).value);
  }

  // next page 
  nextPage() {
    this.active = this.active < this.pages - 1 ? ++this.active : this.active;
  }
  // previous page
  prevPage() {
    this.active = this.active > 0 ? --this.active : this.active;
  }

  // go to first slide 
  firstSlide() {
    this.active = 0;
  }
  // go to last slide 
  lastSlide() {
    this.active = this.pages - 1;
  }
}
