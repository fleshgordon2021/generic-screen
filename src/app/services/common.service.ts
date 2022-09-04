import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComplateTaskCommand } from '../model/command/complate-task';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public transformFromGroupToCamundaVariables(formFroup: FormGroup): ComplateTaskCommand {
    const taskValue = formFroup.getRawValue();
    if(taskValue) {
      Object.keys(taskValue).forEach(
        (el) => {
          taskValue[el] = {
            value: taskValue[el]
           };
        //   if(taskValue[el] instanceof Date) {
        //     const  d = taskValue[el];
        //     const dateString = `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`;
        //     taskValue[el] = dateString;
        //   } else if (taskValue[el] instanceof Object) {
        //     taskValue[el] = {
        //       value: JSON.stringify(taskValue[el]) 
        //     };
        //   } else {
        //     taskValue[el] = {
        //       value: taskValue[el]
        //      };
        //     }
        }
      );
    }
    return taskValue;
  }
}
