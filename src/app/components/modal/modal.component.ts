import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="overlay" (click)="onCloseModal.emit(true)"></div>
    <div class="modal">
      <ng-content />
    </div>
  `,
  standalone: true,
  styles: [
    `
      .overlay {
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100vh;
        background: black;
        opacity: 0.35;
      }

      .modal {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #4b57db;
        padding: 25px;
        border-radius: 10px;
        min-width: 450px;
        display: grid;
        justify-items: center;
        gap: 15px;
      }

      @media (max-width: 768px) {
        .modal {
          min-width: auto;
          padding: 20px 5px;
        }
      }
    `,
  ],
})
export class ModalComponent {
  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter<boolean>();
}
