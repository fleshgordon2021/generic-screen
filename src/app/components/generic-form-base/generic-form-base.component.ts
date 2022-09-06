import { Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { XMLParser } from 'fast-xml-parser';
import { FormField } from '../../model/form-field';
import { ProcessDefinition } from '../../model/process-definition';
import { Task } from '../../model/task';
import { TaskCommand } from '../../model/util/task-command';
import { BpmnService } from '../../services/bpmn.service';
import { SpinnerService } from '../../services/spinner.service';

@Directive({
  selector: 'app-generic-form-base'
})
export class GenericFormBaseComponent implements OnInit, OnDestroy, OnChanges {
  @Input('task') task: Task;
  public formGroup: FormGroup = new FormGroup({});
  public formFields: FormField[] = [];
  public listTaskActions: TaskCommand[] = [];
  @Output() formChage = new EventEmitter<FormGroup>();
  @Output() listTaskActionsChange = new EventEmitter<TaskCommand[]>();
  constructor(
    protected bpmnService: BpmnService,
    protected spinnerService: SpinnerService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.task.currentValue != null ) {
      this.formFields = [];
      this.listTaskActions = [];
      this.formGroup =  new FormGroup({});
      this.genericForm();
    }
  }
  genericForm() {
    this.spinnerService.showSpinner.next(true);
    this.bpmnService.getProcessXML(this.task.processDefinitionId).subscribe(
      (res: ProcessDefinition) => {
        const parser = new XMLParser(
          {
            ignoreAttributes: false
          }
        );
        const xmlToJson = parser.parse(res.bpmn20Xml);
        console.log(xmlToJson);
        if(xmlToJson) {
          let listUserTask = [];
          const userTasks = xmlToJson['bpmn:definitions']['bpmn:process']['bpmn:userTask'];
          const listMessages = xmlToJson['bpmn:definitions']['bpmn:message'];
          const listBoundaryEvents = xmlToJson['bpmn:definitions']['bpmn:process']['bpmn:boundaryEvent'];
          if((listMessages && listMessages.length) > 0 && (listBoundaryEvents && listBoundaryEvents.length > 0)) {
            listBoundaryEvents.forEach(
              (el) => {
                const findMessage = listMessages.find((m) => el['bpmn:messageEventDefinition']['@_messageRef'] && m['@_id'] === el['bpmn:messageEventDefinition']['@_messageRef']);
                this.listTaskActions.push(
                  {
                    activityRef: el['@_attachedToRef'],
                    showBackButton: findMessage ? (findMessage['@_name']  ===  'back' ? true : false) : false
                  }
                )
              }
            );
          }
          this.listTaskActionsChange.emit(this.listTaskActions);
          if(Array.isArray(userTasks)) {
            listUserTask = userTasks; 
          } else {
            listUserTask.push(userTasks);
          }
          if(listUserTask.length > 0) {
            this.initGenericForm(listUserTask);
          }
        }
        this.spinnerService.showSpinner.next(false);
      }
    );
  }
  initGenericForm(listUserTask: any[]) {
    const findUserTask =  listUserTask.find(el => el['@_id'] === this.task.taskDefinitionKey);
    if(findUserTask) {
      const formField = findUserTask['bpmn:extensionElements']['camunda:formData'];
      let listFormFields = [];
      if(Array.isArray(formField['camunda:formField'])) {
        listFormFields = formField['camunda:formField'];
      } else {
        listFormFields.push(formField['camunda:formField']);
      }
      console.log('listFormFields', listFormFields);
      this.mapingData(listFormFields);
      if(this.formFields.length > 0) {
        this.initFormGroup();
      }
    }
  }
  initFormGroup() {
    console.log(this.formFields);
    this.formFields.forEach((el: FormField) => {
      this.formGroup.addControl(el.id, new FormControl(el.defaultValue, this.addValidators(el)));
    });
    this.formChage.emit(this.formGroup);
  }
  addValidators(el: FormField): ValidatorFn | ValidatorFn[] {
    const listValidators = [];
    if(el.required === "true") {
      listValidators.push(Validators.required);
    }
    if(el['data-type'] === "email") {
      listValidators.push(Validators.email);
    }
    return listValidators;
  }
  mapingData(listFormFields: any[]) {
    if(listFormFields.length > 0) {
      listFormFields.forEach(
        (el) => {
           let ff =  {
            id: el['@_id'],
            lable: el['@_label'],
            type: el['@_type'],
            defaultValue: el['@_defaultValue']
          };

          let listProperties = [];
          if(el['camunda:properties'] && Array.isArray(el['camunda:properties']['camunda:property'])) {
            listProperties = el['camunda:properties']['camunda:property'];
          } else {
            if(el['camunda:properties']) {
              listProperties.push(el['camunda:properties']['camunda:property']);
            }
          }
          const properties = listProperties.map(f => ({
            'id': f['@_id'],
            'value': f['@_value']
          }))

          properties.forEach(
            (p) => {
              ff[p['id']] = p.value
            }
          );

          let listValidations = [];
          if(el['camunda:validation'] && Array.isArray(el['camunda:validation']['camunda:constraint'])) {
            listValidations = el['camunda:validation']['camunda:constraint'];
          } else {
            if(el['camunda:validation']) {
              listValidations.push(el['camunda:validation']['camunda:constraint']);
            }
          }
          const validations = listValidations.map(f => ({
            'name': f['@_name'],
            'config': f['@_config']
          }));
          validations.forEach((v) => {
            ff[v['name']] = v['config']; 
          });
          let listValues = [];
          if(el['camunda:value'] && el['camunda:value'].length > 0 ) {
            listValues = el['camunda:value'].map(v => (
              { viewValue: v['@_name'], value: v['@_id'] }
            ));
          }
          ff['options'] = listValues;
          this.formFields.push(ff as FormField);
        }
      );
    }
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
