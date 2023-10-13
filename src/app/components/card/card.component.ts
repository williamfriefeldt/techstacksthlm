import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content />
    </div>
  `,
  standalone: true,
  styles: [
    `
      .card {
        color: #fd5d93;
        border: 1px solid #fd5d93;
        padding: 5px;
        font-size: 25px;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 10px;
      }

      @media (max-width: 768px) {
        .card {
          display: block;
        }
      }
    `,
  ],
})
export class CardComponent {}
