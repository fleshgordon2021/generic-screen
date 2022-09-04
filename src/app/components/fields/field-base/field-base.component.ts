import { Directive, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: 'app-field-base'
})
export class FieldBaseComponent implements OnInit {
  @Input() public control: FormControl;
  @Input() public lable: string;
  @Input() public name: string;
  @Input() public appearance: string = 'outline';
  @Input() public maxLength: number;
  @Input() public countryCode: string;
  @Input() options: any;
  @Input() public prefix: string;
  @Input() public suffix: string;
  constructor() { }

  ngOnInit(): void {
  }

}
