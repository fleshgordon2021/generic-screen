import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
