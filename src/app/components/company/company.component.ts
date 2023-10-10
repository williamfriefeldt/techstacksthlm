import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Company } from '../companies/companies.component';
import { EditComponent } from '../icons/edit/edit.component';

@Component({
  selector: 'app-company',
  template: `
    <app-card>
      <div class="half name">{{ company.name }}</div>
      <div class="half tech-stack">
        <span *ngFor="let tech of company.techStack">
          {{ tech }}
        </span>
        <app-edit *ngIf="hasEdit" (onEdit)="onEditCompany.emit(company)" />
      </div>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, NgForOf, NgIf, EditComponent],
  styles: [
    `
      .name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        min-width: 250px;
      }

      .half {
        width: 50%;
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
    `,
  ],
})
export class CompanyComponent {
  @Input({ required: true }) public company!: Company;
  @Input() public hasEdit: boolean = false;

  @Output() public readonly onEditCompany: EventEmitter<Company> =
    new EventEmitter<Company>();
}
