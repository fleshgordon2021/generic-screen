import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Task } from '../model/task';
import { SseServiceService } from './SseService.service';

@Injectable({
  providedIn: 'root'
})
export class TaskRouterService {
  public routeSubscription: Subscription;
  public businessKey: string;
  constructor(
    protected router: Router,
    private _zone: NgZone,
    private ssService: SseServiceService
  ) {
      this.getServerSentEvent('/next-task').subscribe(
        (data => {
          console.log('data' , data)
          const message = JSON.parse(data.data);
          if(message.businessKey !== undefined) {
            if(message.messageType === 'create' && message.businessKey === this.businessKey) {
              this.navigateTask(message.taskId, message.businessKey);
            }
            if(message.messageType === 'redirection' && message.businessKey === this.businessKey) {
              this.router.navigate([message.route]);
            }
          }
        })
      );
  }
  
  public navigateTask(taskId: string, businessKey?:string) {
    if(businessKey !== null || businessKey !== undefined) {
      this.router.navigate([`generic-task/${taskId}`, {businessKey: businessKey}]);
    } else {
      this.router.navigate([`generic-task/${taskId}`]);
    }
  }

  public getServerSentEvent(url: string): Observable<any> {
    return Observable.create(
      observer => {
        const eventSource = this.ssService.getEventSource(url);

        eventSource.onmessage = event => {
          this._zone.run( () => {
            observer.next(event);
          });
        };

        eventSource.onerror = error => {
          this._zone.run( () => {
            observer.error(error);
          });
        };
      }
    );
  }
}
