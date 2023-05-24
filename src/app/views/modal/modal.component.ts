import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() product?: Product;
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
