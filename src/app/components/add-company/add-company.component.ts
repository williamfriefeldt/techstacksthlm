import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Company } from '../companies/companies.component';
import { CompanyComponent } from '../company/company.component';
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
        <app-company [company]="company" />
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
    LoadingComponent,
    CompanyComponent,
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
    `,
  ],
})
export class AddCompanyComponent {
  private readonly http: HttpClient = inject(HttpClient);

  @Input({ required: true }) public set companyToEdit(
    company: Company | undefined
  ) {
    if (company) {
      this.company = company;
      this.isModalOpen = true;
    }
  }

  @Output() public readonly afterAddCompany: EventEmitter<void> =
    new EventEmitter<void>();

  public isModalOpen: boolean = false;
  public loading: boolean = false;

  public company: Company = {
    name: '',
    techStack: [],
  };

  public setCompanyInfo(type: 'name' | 'techStack', input: string): void {
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
