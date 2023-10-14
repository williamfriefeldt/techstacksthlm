import { injectLoad } from '@analogjs/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, firstValueFrom } from 'rxjs';
import { AddCompanyComponent } from '../components/add-company/add-company.component';
import { BackgroundComponent } from '../components/background/background.component';
import { CompaniesComponent } from '../components/companies/companies.component';
import { HeaderComponent } from '../components/header/header.component';
import { InfoComponent } from '../components/icons/info/info.component';
import { ModalComponent } from '../components/modal/modal.component';
import endpoints from '../shared/endpoints';
import { Company } from '../shared/entities';
import { sortCompanies } from '../shared/sort';
import { load } from './index.server';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-background />
    <app-header />

    <app-companies
      [companies]="companies()"
      (onEditCompany)="onEditCompany($event)"
    />

    <app-add-company
      (addCompany)="addCompany($event)"
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
  private readonly change: ChangeDetectorRef = inject(ChangeDetectorRef);

  private readonly initCompanies: Signal<Company[]> = toSignal(
    injectLoad<typeof load>(),
    { requireSync: true }
  );

  public readonly companies: WritableSignal<Company[]> = signal(
    this.initCompanies()
  );
  public companyToEdit?: Company;

  public async addCompany(company: Company): Promise<void> {
    const companyIndex: number = this.companies().findIndex(
      ({ name }: Company) => name === company.name
    );

    if (companyIndex < 0) {
      const companies = [...this.companies(), company];
      sortCompanies(companies);
      this.companies.set(companies);
    } else {
      this.companies.mutate((companies) => {
        companies[companyIndex].techStack = company.techStack;
      });
    }

    this.change.detectChanges();

    const companyElement: HTMLElement | null = document.getElementById(
      company.name
    );

    if (companyElement) {
      companyElement.scrollIntoView({
        behavior: 'smooth',
      });
    }

    const request: Observable<Company[]> = this.http.post<Company[]>(
      endpoints.companies,
      company
    );
    const newCompanies: Company[] = await firstValueFrom(request);

    this.companies.set(newCompanies);
    this.change.detectChanges();
  }

  public onEditCompany(company: Company): void {
    this.companyToEdit = structuredClone<Company>(company);
  }
}
