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
        border: 2px solid #301934;
        border-radius: 20px;
        color: whitesmoke;
      }

      input::placeholder {
        color: #301934;
      }
    `,
  ],
})
export class InputComponent implements AfterViewInit {
  @Input() public model!: string;
  @Input() autoFocus: boolean = false;
  @Input({ required: true }) placeholder!: string;

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  public ngAfterViewInit(): void {
    const input: HTMLInputElement = this.input!.nativeElement;
    if (this.autoFocus) {
      input.focus();
    }

    input.style.width =
      (input.getAttribute('placeholder')!.length * 9.7).toString() + 'px';
  }
}
