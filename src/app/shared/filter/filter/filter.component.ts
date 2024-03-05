import { Component } from '@angular/core';
import { ToggleFilterDirective } from '../../directives/toggle-filter.directive';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ToggleFilterDirective, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  toggleAddFilterBtn!: Boolean;
  filterForm!: FormGroup;
  filteredArray!: FormArray;
  cols: string[] = ["Blog Title", "Status", "SEO", "Created At", "Created By", "Author"]
  tempCols!: string[];
  filterSearch: string = "";
  constructor(private _FormBuilder: FormBuilder) {
    this.toggleAddFilterBtn = false;
    this.tempCols = this.cols;
  }

  ngOnInit(): void {
    this.fb();
  }

  fb() {
    this.filterForm = this._FormBuilder.group({
      columnId: [null, Validators.required],
      columnName: [null, Validators.required],
      columnValue: [null, Validators.required],
      condition: [null, Validators.required]
    })
  }

  toggleAddBtn() {
    this.toggleAddFilterBtn = !this.toggleAddFilterBtn;
  }

  filter(event: any) {
    if (this.filterSearch) {
      this.tempCols
        = this.cols.filter(column => column.toLowerCase().includes(this.filterSearch));
    }
    else if (event.inputType == "deleteContentBackward" || event.inputType == "deleteContentForward") {
      this.tempCols = this.cols
      this.cols = this.cols.filter(column => column.toLowerCase().includes(this.filterSearch));
    }
    else {
      this.tempCols = this.cols
    }
  }

  addFilter(columnIndex: number): void {
    // (<FormArray>this.filteredArray).push(
    //   new FormGroup(
    //     {
    //       columnid: new FormControl(null, [Validators.required]),
    //       columnName: new FormControl([this.cols[columnIndex], [Validators.required]]),
    //       condition: new FormControl(null, [Validators.required]),
    //       columnValue: new FormControl(null, [Validators.required]),
    //     }
    //   )
    // )
  }


  get controls() {
    return (<FormArray>this.filterForm.get('filteredArray')).controls;
  }

}
