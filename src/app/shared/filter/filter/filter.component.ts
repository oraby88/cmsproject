import { Component } from '@angular/core';
import { ToggleFilterDirective } from '../../directives/toggle-filter.directive';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ToggleFilterDirective, ReactiveFormsModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  toggleAddFilterBtn!: Boolean;
  filterForm!: FormGroup;
  cols: string[] = ["Blog Title", "Status", "SEO", "Created At", "Created By", "Author"]
  tempCols!: string[];
  filterSearch: string = ""
  constructor(private _FormBuilder: FormBuilder) {
    this.toggleAddFilterBtn = false;
    this.tempCols = this.cols;
  }

  ngOnInit(): void {

  }

  fb() {
    this.filterForm = this._FormBuilder.group({
      filteredArray: new FormArray([])
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

  addFilter() {
    const formControl = new FormControl(null, [Validators.required]);
    (<FormArray>this.filterForm.get('filteredArray')).push(formControl);
  }

  get controls() {
    return (this.filterForm.get('filteredArray') as FormArray).controls;
  }

}
