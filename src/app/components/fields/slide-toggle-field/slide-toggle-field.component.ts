import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'app-slide-toggle-field',
  templateUrl: './slide-toggle-field.component.html',
  styleUrls: ['./slide-toggle-field.component.scss']
})
export class SlideToggleFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
