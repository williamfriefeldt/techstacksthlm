import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <input
      [(ngModel)]="model"
      (ngModelChange)="change.emit(model)"
      #input
      [placeholder]="placeholder"
      [disabled]="disabled"
      autocomplete="disabled"
    />
  `,
  standalone: true,
  imports: [FormsModule],
  styles: [
    `
      input {
        font-size: 20px;
        height: 20px;
        outline: none;
        background: transparent;
        padding: 5px 10px;
        border: 2px solid #fd5d93;
        border-radius: 20px;
        color: whitesmoke;
      }

      input::placeholder {
        color: #fd5d93;
      }

      input:disabled {
        opacity: 0.5;
      }
    `,
  ],
})
export class InputComponent implements AfterViewInit {
  @Input() public model!: string;
  @Input({ required: true }) public placeholder!: string;

  @Input() public autoFocus: boolean = false;
  @Input() public disabled: boolean = false;

  @Output() public readonly change: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('input') public readonly input!: ElementRef<HTMLInputElement>;

  public ngAfterViewInit(): void {
    const input: HTMLInputElement = this.input!.nativeElement;
    if (this.autoFocus) {
      input.focus();
    }

    input.style.width =
      (input.getAttribute('placeholder')!.length * 9.7).toString() + 'px';
  }
}
