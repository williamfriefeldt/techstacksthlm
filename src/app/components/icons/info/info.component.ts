import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { fold } from '../../../animations/fold';

@Component({
  selector: 'app-info',
  template: `
    <div
      class="container"
      (mouseenter)="isOpen = true"
      (mouseleave)="isOpen = false"
    >
      <ng-container *ngIf="!isOpen; else info">i</ng-container>

      <ng-template #info>
        <div class="links">
          <div
            *ngForOf="let item of info; let i = index"
            [@fold]="{ value: '', params: { delay: i * 0.05 + 's' } }"
            class="row"
          >
            <div>{{ item.text }}</div>
            <a [href]="item.link" target="_blank">
              <img
                [class]="item.img + '-img'"
                [src]="'/' + item.linkedin + '.png'"
              />
            </a>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  standalone: true,
  styles: [
    `
      .container {
        color: #fd5d93;
        border: 2px solid #fd5d93;
        border-radius: 20px;
        background: #171941;
        position: fixed;
        bottom: 20px;
        left: 20px;
        font-size: 20px;
        padding: 10px 15px;
      }

      .links {
        min-height: 25px;
      }

      a {
        transition: transform 0.15s ease-in;
      }

      a:hover {
        transform: scale(1.01);
      }

      .analog-img {
        width: 30px;
      }

      .linkedin-img,
      .github-img {
        width: 22.5px;
        border-radius: 4px;
        margin-right: 5px;
      }

      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: space-between;
      }
    `,
  ],
  imports: [NgIf, NgForOf],
  animations: [fold],
})
export class InfoComponent {
  public isOpen: boolean = false;

  public info = [
    {
      text: 'Built by William',
      link: 'https://www.linkedin.com/in/william-friefeldt/',
      img: 'linkedin',
    },
    { text: 'Built with Analog', link: 'https://analogjs.org/', img: 'analog' },
    {
      text: 'Codebase',
      link: 'https://github.com/williamfriefeldt',
      img: 'github',
    },
  ] as const;
}
