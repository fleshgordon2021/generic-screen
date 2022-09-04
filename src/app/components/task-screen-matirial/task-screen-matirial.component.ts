import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Task } from '../../model/task';
import { BpmnService } from '../../services/bpmn.service';
import { combineLatest } from 'rxjs';
import { TaskRouterService } from 'src/app/services/task-router.service';
import { TaskCommand } from 'src/app/model/util/task-command';
import { CommandMessage } from 'src/app/model/command/command-message';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-task-screen-matirial',
  templateUrl: './task-screen-matirial.component.html',
  styleUrls: ['./task-screen-matirial.component.scss']
})
export class TaskScreenMatirialComponent implements OnInit, OnDestroy {
  private taskId: string;
  public task: Task;
  public formGroup: FormGroup = new FormGroup({});
  public listTaskActions: TaskCommand[] = [];
  constructor(
    private bpmn: BpmnService,
    private activeRoute: ActivatedRoute,
    private taskRouterService: TaskRouterService,
    private spinnerService: SpinnerService
  ) { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    combineLatest(
      this.activeRoute.params,
      this.activeRoute.queryParams
    ).subscribe(([params, queryParams] : [Params, any]) => {
      this.taskId = params.taskId;
      this.spinnerService.showSpinner.next(true);
      this.bpmn.getTask(this.taskId).subscribe(
        (t: any) => {
          this.spinnerService.showSpinner.next(false);
          this.task = t;
          this.task.businessKey = params.businessKey
        }
      );
    });
  }
  public setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
    this.initFormFields();
  }
  
  public setTaskActionList(listTaskActions: TaskCommand[]) {
    this.listTaskActions = listTaskActions;
  }

  public stopProcess() {
    this.taskRouterService.businessKey = this.task.businessKey;
    const commandMessage: CommandMessage = {
      businessKey: this.task.businessKey,
      messageName: 'stop'
    }
    this.spinnerService.showSpinner.next(true);
    this.bpmn.executeMessage(commandMessage).subscribe(() => {
      this.spinnerService.showSpinner.next(false);
    });
  }

  private initFormFields() {
    this.spinnerService.showSpinner.next(true);
    this.bpmn.getVariables(this.taskId).subscribe(
      (res) => {
        if(res) {
          Object.keys(res).forEach(
            (el) => {
              if(this.formGroup.controls[el]) {
                this.formGroup.controls[el]?.setValue(res[el]?.value);
              }
            }
          );
          this.spinnerService.showSpinner.next(false);
        }
      }
    );
  }
}
