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
import { InfoComponent } from '../components/icons/info/info.component';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-background />
    <app-header />
    <app-companies
      [companies]="companies$ | async"
      (onEditCompany)="onEditCompany($event)"
    />

    <app-add-company
      (afterAddCompany)="afterAddCompany()"
      [companyToEdit]="companyToEdit"
    />

    <app-info />
  `,
  imports: [
    BackgroundComponent,
    HeaderComponent,
    CompaniesComponent,
    AsyncPipe,
    ModalComponent,
    NgIf,
    AddCompanyComponent,
    InfoComponent,
  ],
})
export default class HomeComponent {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly updateCompanies$: Subject<void> = new Subject<void>();

  public companies$: Observable<Company[]> = this.http
    .get<Company[]>('/api/v1/companies')
    .pipe(repeatWhen((): Subject<void> => this.updateCompanies$));

  public companyToEdit?: Company;

  public afterAddCompany(): void {
    this.updateCompanies$.next();
  }

  public onEditCompany(company: Company): void {
    this.companyToEdit = structuredClone<Company>(company);
  }
}
