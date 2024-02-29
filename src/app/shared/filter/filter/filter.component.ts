import { Component } from '@angular/core';
import { ToggleFilterDirective } from '../../directives/toggle-filter.directive';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ToggleFilterDirective, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  filterForm!: FormGroup;

  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  fb() {
    this.filterForm = this._FormBuilder.group({
      filteredArray: new FormArray([])
    })
  }

  showFilter() { }

  addFilter() {
    const formControl = new FormControl(null, [Validators.required]);
    (<FormArray>this.filterForm.get('filteredArray')).push(formControl);
  }

  get controls() {
    return (this.filterForm.get('filteredArray') as FormArray).controls;
  }

}
