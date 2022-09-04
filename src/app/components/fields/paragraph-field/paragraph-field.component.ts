import { Component, Input, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'app-paragraph-field',
  templateUrl: './paragraph-field.component.html',
  styleUrls: ['./paragraph-field.component.scss']
})
export class ParagraphFieldComponent extends FieldBaseComponent implements OnInit {
  @Input() public paragraphText: string;
  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
