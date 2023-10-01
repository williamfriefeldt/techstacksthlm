import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable, Subject, repeatWhen } from 'rxjs';
import { AddCompanyComponent } from '../components/add-company/add-company.component';
import { BackgroundComponent } from '../components/background/background.component';
import {
  CompaniesComponent,
  Company,
} from '../components/companies/companies.component';
import { HeaderComponent } from '../components/header/header.component';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-background />
    <app-header />
    <app-companies
      [companies]="companies$ | async"
      (onEditCompany)="companyToEdit = $event"
    />

    <app-add-company
      (afterAddCompany)="afterAddCompany()"
      [companyToEdit]="companyToEdit"
    />
  `,
  imports: [
    BackgroundComponent,
    HeaderComponent,
    CompaniesComponent,
    AsyncPipe,
    ModalComponent,
    NgIf,
    AddCompanyComponent,
  ],
})
export default class HomeComponent {
  private readonly http = inject(HttpClient);

  private readonly updateCompanies$ = new Subject<void>();

  public companies$: Observable<Company[]> = this.http
    .get<Company[]>('/api/v1/companies')
    .pipe(repeatWhen(() => this.updateCompanies$));

  public companyToEdit?: Company;

  public afterAddCompany() {
    this.updateCompanies$.next();
  }
}
