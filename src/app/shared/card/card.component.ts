import { Component, Input, OnInit, } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input('icon_path') icon_path!: string;
  @Input('title') title!: string;
  @Input('description') description!: string;
  @Input('description_continue') description_continue!: string;
  @Input('total_number') total_number!: string;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {

  }
}
