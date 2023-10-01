import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="container"><div class="loader">/</div></div>`,
  standalone: true,
  styles: [
    `
      .container {
        display: flex;
        justify-content: center;
      }

      .loader {
        color: #fd5d93;
        font-size: 50px;
        animation: 1s infinite spin;
        width: fit-content;
      }

      @keyframes spin {
        50% {
          transform: rotate(180deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingComponent {}
