import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchText: string = '';
  isFiltered: boolean = false;
  @Output() searchTitle: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange() {
    if (this.searchText) {
      const searchValue = this.searchText.toLowerCase();
      this.searchTitle.emit(searchValue);
    }else {
      this.isFiltered = false;
    }
  }
}
