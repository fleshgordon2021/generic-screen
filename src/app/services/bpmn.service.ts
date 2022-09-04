import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandMessage } from '../model/command/command-message';
import { CommandVariables } from '../model/command/commandVariables';
import { ProcessData } from '../model/process-data';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class BpmnService {
  private camundaUrl = 'http://localhost:8080/engine-rest'; 
  constructor(
    private http: HttpClient
  ) { }

  public startProcces(key: string, body: any):Observable<ProcessData> {
   return this.http.post<ProcessData>(
      `${this.camundaUrl}/engine/default/process-definition/key/${key}/start`, 
      {
       "businessKey" : body.businessKey
      },
    );
  }
  public getProcessXML(definitionId: string) {
    return this.http.get(`${this.camundaUrl}/engine/default/process-definition/${definitionId}/xml`);
  }

  public getTask(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.camundaUrl}/task/${taskId}`);
  }
  public complateTask(id: string, variables: any) {
    return this.http.post<any>(`${this.camundaUrl}/task/${id}/complete`, variables);
  }
  public postVariables(id: string, variables: CommandVariables) {
    return this.http.post<any>(`${this.camundaUrl}/task/${id}/variables`, variables);
  }
  public getVariables(id: string) {
    return this.http.get<any>(`${this.camundaUrl}/task/${id}/variables`);
  }
  public getNextTask(businessKey: string): Observable<Task []> {
    return this.http.get<Task []>(`${this.camundaUrl}/task?processInstanceBusinessKey=${businessKey}`);
  }

  public executeMessage(body: CommandMessage) {
    return this.http.post<any>(`${this.camundaUrl}/message`, body);

  }
}
