import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskScreenMatirialComponent } from './components/task-screen-matirial/task-screen-matirial.component';
import { GenericFormMatirialComponent } from './components/generic-form-matirial/generic-form-matirial.component';
import { GenericFormBaseComponent } from './components/generic-form-base/generic-form-base.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FieldBaseComponent } from './components/fields/field-base/field-base.component';
import { GenericActionsComponent } from './components/generic-actions/generic-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { EmailFieldComponent } from './components/fields/email-field/email-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/fields/text-field/text-field.component';
import { NumberFieldComponent } from './components/fields/number-field/number-field.component';
import { TextareaFieldComponent } from './components/fields/textarea-field/textarea-field.component';
import { PhoneNumberFieldComponent } from './components/fields/phone-number-field/phone-number-field.component';
import { DatepickerFieldComponent } from './components/fields/datepicker-field/datepicker-field.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CheckboxFieldComponent } from './components/fields/checkbox-field/checkbox-field.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SlideToggleFieldComponent } from './components/fields/slide-toggle-field/slide-toggle-field.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RadioGroupFieldComponent } from './components/fields/radio-group-field/radio-group-field.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { DividerFieldComponent } from './components/fields/divider-field/divider-field.component';
import { AmountFieldComponent } from './components/fields/amount-field/amount-field.component';
import { SelectFieldComponent } from './components/fields/select-field/select-field.component';
import { MatSelectModule } from '@angular/material/select';
import { TaskRouterService } from './services/task-router.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HtmlFieldComponent } from './components/fields/html-field/html-field.component';
import { ParagraphFieldComponent } from './components/fields/paragraph-field/paragraph-field.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListSurveysComponent } from './components/list-surveys/list-surveys.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    TaskScreenMatirialComponent,
    GenericFormMatirialComponent,
    GenericFormBaseComponent,
    HomeComponent,
    FieldBaseComponent,
    GenericActionsComponent,
    EmailFieldComponent,
    TextFieldComponent,
    NumberFieldComponent,
    TextareaFieldComponent,
    PhoneNumberFieldComponent,
    DatepickerFieldComponent,
    CheckboxFieldComponent,
    SlideToggleFieldComponent,
    RadioGroupFieldComponent,
    DividerFieldComponent,
    AmountFieldComponent,
    SelectFieldComponent,
    HtmlFieldComponent,
    ParagraphFieldComponent,
    ListSurveysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDividerModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [TaskRouterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
