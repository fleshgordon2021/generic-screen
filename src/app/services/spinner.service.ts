import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  public showSpinnerOnScreen() {
    this.showSpinner.next(true);
  }

  public closeSpinner() {
    this.showSpinner.next(false);
  }
}
