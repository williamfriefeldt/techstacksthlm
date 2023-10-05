import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-background',
  standalone: true,
  template: `
    <div class="container">
      <div
        *ngFor="let i of [1, 2, 3, 4, 5]"
        [class]="'square square-' + i"
      ></div>
    </div>
  `,
  styles: [
    `
      @keyframes move-left-right {
        0%,
        100% {
          transform: translateX(-10px);
        }
        50% {
          transform: translateX(10px);
        }
      }

      .container {
        position: fixed;
        height: 100vh;
        width: 100%;
        z-index: -1;
      }

      .square {
        background: linear-gradient(0deg, #4b57db 0, #fd5d93 100%);
        position: absolute;
        transition: 0.5s ease-out;
        overflow: hidden;
        border-radius: 20%;
      }

      .square-1 {
        animation: 4s infinite move-left-right;
        height: 300px;
        width: 300px;
        opacity: 0.5;
        left: 3%;
        top: -21%;
      }

      .square-2 {
        animation: 6s infinite move-left-right;
        height: 400px;
        width: 400px;
        opacity: 0.4;
        right: -5%;
        top: -12%;
      }

      .square-3 {
        animation: 5s infinite move-left-right;
        height: 250px;
        width: 250px;
        opacity: 0.1;
        left: 32%;
        bottom: 29%;
      }

      .square-4 {
        animation: 3s infinite move-left-right;
        width: 300px;
        height: 300px;
        right: -5%;
        bottom: 0;
        opacity: 0.1;
      }

      .square-5 {
        height: 200px;
        width: 200px;
        opacity: 0.1;
        left: -5%;
        bottom: 0;
      }
    `,
  ],
  imports: [NgForOf],
})
export class BackgroundComponent {}
