import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'app-html-field',
  templateUrl: './html-field.component.html',
  styleUrls: ['./html-field.component.scss']
})
export class HtmlFieldComponent extends FieldBaseComponent implements OnInit, OnChanges {
  @Input('htmlStr') htmlStr: string
  constructor() { 
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
