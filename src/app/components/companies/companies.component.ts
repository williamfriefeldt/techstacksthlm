import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SearchTermService } from '../../services/search-term/search-term.service';
import { CardComponent } from '../card/card.component';
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
        <app-card *ngFor="let company of filteredCompanies">
          <div class="half name">{{ company.name }}</div>
          <div class="half tech-stack">
            <span *ngFor="let tech of company.techStack">
              {{ tech }}
            </span>
            <app-edit (onEdit)="onEditCompany.emit(company)" />
          </div>
        </app-card>

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
  ],
  styles: [
    `
      .container {
        display: grid;
        gap: 15px;
        margin-bottom: 50px;
      }

      .half {
        width: 50%;
      }

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      @media (max-width: 768px) {
        .half {
          width: 100%;
        }

        .name {
          font-weight: bold;
        }
      }

      .tech-stack {
        display: flex;
        justify-content: end;
        flex-wrap: wrap;
      }

      .tech-stack span {
        margin-right: 10px;
      }

      .no-companies {
        text-align: center;
        color: #fd5d93;
        font-size: 18px;
      }
    `,
  ],
})
export class CompaniesComponent {
  public readonly searchTermService = inject(SearchTermService);

  @Input() companies: Company[] | null = null;

  @Output() public readonly onEditCompany: EventEmitter<Company> =
    new EventEmitter<Company>();
}
