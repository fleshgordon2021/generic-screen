import { Component, OnDestroy, OnInit } from '@angular/core';
import { BpmnService } from '../../services/bpmn.service';
import { v4 as uuidv4 } from 'uuid';
import { ProcessData } from '../../model/process-data';
import { TaskRouterService } from '../../services/task-router.service';
import { SpinnerService } from '../../services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public businessKey: string;
  constructor(
    private bpmn: BpmnService,
    private taskRouterService: TaskRouterService,
    private spinnerService: SpinnerService,
    private router: Router
  ) { }
  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {

  }

  public startProcess() {
    const body = {};
    this.businessKey = uuidv4();
    body['businessKey'] =  this.businessKey;
    this.taskRouterService.businessKey = this.businessKey;
    this.spinnerService.showSpinner.next(true);
    this.bpmn.startProcces('customer-survey', body).subscribe(
      (res: ProcessData) => {
        this.spinnerService.showSpinner.next(false);
      }
    );
  }
  public getList() {
    this.router.navigate(['/list-surveys']);
  }
}
