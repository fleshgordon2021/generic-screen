import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'app-datepicker-field',
  templateUrl: './datepicker-field.component.html',
  styleUrls: ['./datepicker-field.component.scss']
})
export class DatepickerFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
