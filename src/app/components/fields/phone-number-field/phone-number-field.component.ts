import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'app-phone-number-field',
  templateUrl: './phone-number-field.component.html',
  styleUrls: ['./phone-number-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhoneNumberFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
