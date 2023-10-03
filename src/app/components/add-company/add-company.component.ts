import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Company } from '../companies/companies.component';
import { InputComponent } from '../input/input.component';
import { LoadingComponent } from '../loading/loading.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-company',
  template: `
    <div class="add-company" (click)="isModalOpen = true">Add company</div>

    <app-modal (onCloseModal)="closeModal()" *ngIf="isModalOpen">
      <h2 class="title">Add company</h2>
      <app-input
        [model]="company.name"
        [autoFocus]="true"
        (change)="setCompanyInfo('name', $event)"
        placeholder="Name of the company..."
      />

      <app-input
        [model]="company.techStack.join(' ')"
        (change)="setCompanyInfo('techStack', $event)"
        placeholder="Tech stack, seperate with space..."
      />

      <ng-container *ngIf="company.name.length">
        <div class="preview-title">How it will look:</div>
        <app-card class="container">
          <div class="half name">{{ company.name }}</div>
          <div class="half tech-stack">
            <ng-container *ngFor="let tech of company.techStack">
              {{ tech }}
            </ng-container>
          </div>
        </app-card>
      </ng-container>

      <div
        class="add-company btn"
        *ngIf="company.name.length && company.techStack.length"
        (click)="addCompany()"
      >
        <span *ngIf="!loading; else loadingCompany">Add company</span>

        <ng-template #loadingCompany>
          <app-loading />
        </ng-template>
      </div>
    </app-modal>
  `,
  standalone: true,
  imports: [
    NgIf,
    ModalComponent,
    InputComponent,
    CardComponent,
    NgForOf,
    LoadingComponent,
  ],
  styles: [
    `
      .title {
        margin: 0;
      }

      .add-company {
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-size: 20px;
        padding: 5px 10px;
        border: 2px solid #fd5d93;
        border-radius: 20px;
        cursor: pointer;
        color: #fd5d93;
        transition: transform 0.15s ease-in;
        background: #171941;
      }

      .add-company.btn {
        position: initial;
      }

      .add-company:hover {
        transform: scale(1.05);
      }

      .container {
        display: grid;
        gap: 15px;
        width: 100%;
      }

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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
      }
    `,
  ],
})
export class AddCompanyComponent {
  private readonly http = inject(HttpClient);

  @Input() set companyToEdit(company: Company | undefined) {
    if (company) {
      this.company = company;
      this.isModalOpen = true;
    }
  }

  @Output() afterAddCompany: EventEmitter<void> = new EventEmitter<void>();

  public isModalOpen: boolean = false;
  public loading: boolean = false;

  public company: Company = {
    name: '',
    techStack: [],
  };

  public setCompanyInfo(type: 'name' | 'techStack', input: string) {
    if (typeof input === 'string') {
      if (type === 'name') {
        this.company.name = input;
        return;
      }

      this.company.techStack = input.split(' ');
    }
  }

  public addCompany(): void {
    this.loading = true;
    this.http.post('api/v1/companies', this.company).subscribe((v) => {
      this.afterAddCompany.emit();
      this.loading = false;
      this.closeModal();
    });
  }

  public closeModal(): void {
    this.company.name = '';
    this.company.techStack = [];
    this.isModalOpen = false;
  }
}
