import { NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { fold } from '../../animations/fold';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SearchTermService } from '../../services/search-term/search-term.service';
import { Company } from '../../shared/entities';
import { CardComponent } from '../card/card.component';
import { CompanyComponent } from '../company/company.component';
import { EditComponent } from '../icons/edit/edit.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-companies',
  template: `
    <div class="container">
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
          [company]="company"
          [hasEdit]="true"
          (onEditCompany)="onEditCompany.emit($event)"
          [id]="company.name"
          class="company"
        />

        <div @fold class="no-companies" *ngIf="!filteredCompanies.length">
          No companies with that tech stack...
        </div>
      </ng-container>
    </div>
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
        margin-bottom: 50px;
      }

      .no-companies {
        text-align: center;
        color: #fd5d93;
        font-size: 18px;
      }

      .company {
        scroll-margin-top: 100px;
      }
    `,
  ],
  animations: [fold],
})
export class CompaniesComponent {
  public readonly searchTermService: SearchTermService =
    inject(SearchTermService);
  private readonly change: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input({ required: true }) public companies!: Company[];

  @Output() public readonly onEditCompany: EventEmitter<Company> =
    new EventEmitter<Company>();

  public readonly firstRender: WritableSignal<boolean> = signal(true);

  public ngAfterViewInit(): void {
    this.firstRender.set(false);
    this.change.detectChanges();
  }

  public companiesTrackBy(_index: number, { name }: Company): string {
    return name;
  }
}
