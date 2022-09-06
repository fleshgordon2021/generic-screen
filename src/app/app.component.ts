import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked{
  title = 'generic-screen';
  constructor(
    public  spinerService: SpinnerService,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
}
