import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { BpmnService } from '../../services/bpmn.service';
import { GenericFormBaseComponent } from '../generic-form-base/generic-form-base.component';

@Component({
  selector: 'app-generic-form-matirial',
  templateUrl: './generic-form-matirial.component.html',
  styleUrls: ['./generic-form-matirial.component.scss']
})
export class GenericFormMatirialComponent extends GenericFormBaseComponent implements OnInit {

  constructor(
    bpmnService: BpmnService,
    spinnerService: SpinnerService
  ) { 
    super(bpmnService, spinnerService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
