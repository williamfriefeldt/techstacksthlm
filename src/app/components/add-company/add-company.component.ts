import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fold } from '../../animations/fold';
import { Company } from '../../shared/entities';
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
        [autoFocus]="!disabledName"
        (change)="setCompanyInfo('name', $event)"
        placeholder="Name of the company..."
        [disabled]="disabledName"
      />

      <app-input
        [@fold]
        *ngIf="company.name.length"
        [model]="company.techStack.join(' ')"
        (change)="setCompanyInfo('techStack', $event)"
        placeholder="Tech stack, seperate with space..."
        [autoFocus]="disabledName"
      />

      <div @fold *ngIf="company.name.length && company.techStack.length">
        <div class="preview-title">How it will look:</div>
        <app-company [company]="company" />
      </div>

      <div @fold *ngIf="company.name.length && company.techStack.length > 0">
        <div class="add-company btn" (click)="onAddCompany()">
          <span *ngIf="!loading; else loadingCompany">Add company</span>

          <ng-template #loadingCompany>
            <app-loading />
          </ng-template>
        </div>
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
        max-height: 25px;
        height: 100%;
      }

      .add-company:hover {
        transform: scale(1.05);
      }

      .preview-title {
        text-align: center;
        margin-bottom: 5px;
      }
    `,
  ],
  animations: [fold],
})
export class AddCompanyComponent {
  @Input({ required: true }) public set companyToEdit(
    company: Company | undefined
  ) {
    if (company) {
      this.company = company;
      this.isModalOpen = true;
      this.disabledName = true;
    }
  }

  @Output() public readonly addCompany: EventEmitter<Company> =
    new EventEmitter<Company>();

  public isModalOpen: boolean = false;
  public loading: boolean = false;
  public disabledName: boolean = false;

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

  public onAddCompany(): void {
    this.addCompany.emit(this.company);
    this.closeModal();
  }

  public closeModal(): void {
    this.company = { name: '', techStack: [] };
    this.isModalOpen = false;
  }
}
