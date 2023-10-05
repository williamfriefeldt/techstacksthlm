import { NgForOf, NgIf } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { fold } from '../../animations/fold';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SearchTermService } from '../../services/search-term/search-term.service';
import { CardComponent } from '../card/card.component';
import { CompanyComponent } from '../company/company.component';
import { EditComponent } from '../icons/edit/edit.component';
import { LoadingComponent } from '../loading/loading.component';

export interface Company {
  name: string;
  techStack: string[];
}

@Component({
  selector: 'app-companies',
  template: `
    <div class="container" *ngIf="companies; else loading">
      <ng-container
        *ngIf="
          companies
            | filter : searchTermService.searchTerms as filteredCompanies
        "
      >
        <app-company
          *ngFor="
            let company of filteredCompanies;
            trackBy: companiesTrackBy;
            let i = index
          "
          [@fold]="{
            value: '',
            params: { delay: firstRender ? 0.05 * i : 0 + 's' }
          }"
          [company]="company"
          [hasEdit]="true"
          (onEditCompany)="onEditCompany.emit($event)"
        ></app-company>

        <div class="no-companies" *ngIf="!filteredCompanies.length">
          No companies with that tech stack...
        </div>
      </ng-container>
    </div>

    <ng-template #loading> <app-loading /></ng-template>
  `,
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CardComponent,
    FilterPipe,
    LoadingComponent,
    EditComponent,
    CompanyComponent,
  ],
  styles: [
    `
      .container {
        display: grid;
        gap: 15px;
        margin-bottom: 50px;
      }

      .no-companies {
        text-align: center;
        color: #fd5d93;
        font-size: 18px;
      }
    `,
  ],
  animations: [fold],
})
export class CompaniesComponent implements AfterViewChecked {
  public readonly searchTermService = inject(SearchTermService);

  public firstRender: boolean = true;

  @Input({ required: true }) public companies: Company[] | null = null;

  @Output() public readonly onEditCompany: EventEmitter<Company> =
    new EventEmitter<Company>();

  public companiesTrackBy(_index: number, { name }: Company): string {
    return name;
  }

  public ngAfterViewChecked(): void {
    this.firstRender = false;
  }
}
