import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
