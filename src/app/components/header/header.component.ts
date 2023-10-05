import { Component, inject } from '@angular/core';
import { SearchTermService } from '../../services/search-term/search-term.service';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-header',
  template: `
    <div class="container">
      <h1 class="center">tech stack sthlm</h1>
      <app-input
        (change)="onChange($event)"
        [autoFocus]="true"
        placeholder="Search company or tech..."
      />
    </div>
  `,
  standalone: true,
  styles: [
    `
      .container {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 10px;
      }

      @media (max-width: 768px) {
        .container {
          justify-content: center;
        }
      }

      h1 {
        margin: 0;
      }
    `,
  ],
  imports: [InputComponent],
})
export class HeaderComponent {
  private readonly searchTermService: SearchTermService =
    inject(SearchTermService);

  public onChange(searchTerm: string): void {
    this.searchTermService.searchTerms = searchTerm.split(' ');
  }
}
