import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../services/survey.service';
import { BpmnService } from '../../services/bpmn.service';
import { TaskRouterService } from '../../services/task-router.service';
import { SpinnerService } from '../../services/spinner.service';
import { ProcessData } from '../../model/process-data';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-surveys',
  templateUrl: './list-surveys.component.html',
  styleUrls: ['./list-surveys.component.scss']
})
export class ListSurveysComponent implements OnInit {
  displayedColumns: string[] = ['email', 'productScore', 'longUsedProducts', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private surveyService: SurveyService,
    private bpmn: BpmnService,
    private taskRouterService: TaskRouterService,
    private spinnerService: SpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(
      (res: any[]) => {
        res.forEach(
          (el) => {
            if(el.longUsedProducts) {
              el.longUsedProducts = this.textTransform(el.longUsedProducts);
            }
          }
        );
        this.dataSource = new MatTableDataSource<any>(res);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public textTransform(text: string) {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }

  public navigateHome () {
    this.router.navigate(['/home']);
  }

  public deleteSurvey(survey: any) {
    const body = {};
    body['businessKey'] =  survey.id;
    this.taskRouterService.businessKey = survey.id;
    this.spinnerService.showSpinner.next(true);
    this.bpmn.startProcces('delete-survey', body).subscribe(
      (res: ProcessData) => {
        this.spinnerService.showSpinner.next(false);
      }
    );
  }
  public updateSurvey(survey: any) {
    const body = {};
    body['businessKey'] =  survey.id;
    this.taskRouterService.businessKey = survey.id;
    this.spinnerService.showSpinner.next(true);
    this.bpmn.startProcces('update-customer-survey', body).subscribe(
      (res: ProcessData) => {
        this.spinnerService.showSpinner.next(false);
      }
    );
  }
}

