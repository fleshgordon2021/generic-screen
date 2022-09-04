import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss']
})
export class EmailFieldComponent extends FieldBaseComponent implements OnInit {
  constructor() { 
    super()
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
