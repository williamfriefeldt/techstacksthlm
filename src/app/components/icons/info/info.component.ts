import { NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { fold } from '../../../animations/fold';

@Component({
  selector: 'app-info',
  template: `
    <div class="container" (click)="isOpen = true">
      <ng-container *ngIf="!isOpen; else info">i</ng-container>

      <ng-template #info>
        <div class="links">
          <div
            *ngFor="let item of information; let i = index"
            [@fold]="{ value: '', params: { delay: i * 0.05 + 's' } }"
          >
            <a [href]="item.link" target="_blank">
              <span>{{ item.text }}</span>

              <img
                [class]="item.img + '-img'"
                [src]="'/' + item.img + '.png'"
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
        padding: 5px 10px;
        cursor: pointer;
        transition: transform 0.15s ease-in;
      }

      .container:hover {
        transform: scale(1.05);
      }

      .links {
        min-height: 25px;
      }

      a {
        transition: transform 0.15s ease-in;
        display: flex;
        justify-content: space-between;
        width: 100%;
        text-decoration: none;
        color: #fd5d93;
        gap: 5px;
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
    `,
  ],
  imports: [NgIf, NgForOf],
  animations: [fold],
})
export class InfoComponent {
  public isOpen: boolean = false;

  public information = [
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

  private readonly element: ElementRef = inject(ElementRef);

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    if (!this.element.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
