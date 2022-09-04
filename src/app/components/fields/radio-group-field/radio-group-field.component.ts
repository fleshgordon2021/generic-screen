import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'app-radio-group-field',
  templateUrl: './radio-group-field.component.html',
  styleUrls: ['./radio-group-field.component.scss']
})
export class RadioGroupFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
