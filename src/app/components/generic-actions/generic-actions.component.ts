import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommandMessage } from 'src/app/model/command/command-message';
import { Task } from 'src/app/model/task';
import { TaskCommand } from 'src/app/model/util/task-command';
import { BpmnService } from 'src/app/services/bpmn.service';
import { CommonService } from 'src/app/services/common.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskRouterService } from 'src/app/services/task-router.service';

@Component({
  selector: 'app-generic-actions',
  templateUrl: './generic-actions.component.html',
  styleUrls: ['./generic-actions.component.scss']
})
export class GenericActionsComponent implements OnInit , OnChanges, OnDestroy {
  @Input('task') task: Task;
  @Input('listTaskActions') listTaskActions: TaskCommand[];

  @Input('formGroup') formGroup: FormGroup;
  public showBackButton = false;
  constructor(
    protected commonService: CommonService,
    protected bpmn: BpmnService,
    protected taskRouterService: TaskRouterService,
    protected spinnerService: SpinnerService
  ) { }
  ngOnDestroy(): void {
    this.listTaskActions = [];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.listTaskActions && changes.listTaskActions.currentValue !== null) {
      const findTaskAction = this.listTaskActions.find((t) => t.activityRef === this.task.taskDefinitionKey);
      if(findTaskAction) {
        this.showBackButton = findTaskAction.showBackButton;
      } else {
        this.showBackButton = false;
      }
    }
  }

  ngOnInit(): void {
  }

  public complateTask() {
    this.taskRouterService.businessKey = this.task.businessKey;
    const copmpleteUserTaskCommand = {};
    copmpleteUserTaskCommand['variables'] = this.commonService.transformFromGroupToCamundaVariables(this.formGroup);
    copmpleteUserTaskCommand["withVariablesInReturn"] = true;
    this.spinnerService.showSpinner.next(true);
    this.bpmn.complateTask(this.task.id, copmpleteUserTaskCommand).subscribe(
      () => {
        this.spinnerService.showSpinner.next(false);
      }
    );
  }

  public back() {
    this.taskRouterService.businessKey = this.task.businessKey;
    const commandMessage: CommandMessage = {
      businessKey: this.task.businessKey,
      messageName: 'back'
    }
    this.spinnerService.showSpinner.next(true);
    this.bpmn.executeMessage(commandMessage).subscribe(
      () => {
        this.spinnerService.showSpinner.next(false);
      }
    );
  }

}
