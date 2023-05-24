import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() isOpen: boolean;
  @Input() cartItems: Product[] = [];
  
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cartItemCountChange: EventEmitter<number> = new EventEmitter<number>();


  cartItemCount: number = 0;

  constructor() {
    this.isOpen = false;
    this.cartItems = [];
  }

  closeSidenav() {
    this.toggle.emit(false);
  }

  decreaseQuantity(item: Product) {
    if (item.quantity > 1) {
      item.quantity--;
    }
    this.calculateCartItemCount();
    this.emitCartItemCount();
  }
  
  increaseQuantity(item: Product) {
    item.quantity++;
    this.calculateCartItemCount();
    this.emitCartItemCount();
  }

  calculateCartItemCount() {
    this.cartItemCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  
  addToCart(product: Product) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      const newProduct = { ...product };
      this.cartItems.push(newProduct);
    }
  
    this.calculateCartItemCount();
    this.emitCartItemCount();
  }

  removeFromCart(item: Product) {
    const index = this.cartItems.findIndex(p => p.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    this.calculateCartItemCount();
    this.emitCartItemCount();
  }

  emitCartItemCount() {
    const cartItemCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartItemCountChange.emit(cartItemCount);
  }

  downloadProducts(format: 'csv' | 'xls' | 'xlsx') {
    const selectedProducts = this.cartItems.filter(item => item.quantity > 0);

    const data = selectedProducts.map(product => ({
      Title: product.title,
      Price: product.price,
      Quantity: product.quantity
    }));

    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Products');

    let fileData: Blob | null = null;
    let fileName = '';

    if (format === 'csv') {
      const csvData = XLSX.utils.sheet_to_csv(sheet);
      fileData = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      fileName = 'products.csv';
    } else if (format === 'xls') {
      const xlsData = XLSX.write(workbook, { type: 'binary', bookType: 'xls' });
      fileData = new Blob([this.s2ab(xlsData)], { type: 'application/vnd.ms-excel' });
      fileName = 'products.xls';
    } else if (format === 'xlsx') {
      const xlsxData = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });
      fileData = new Blob([this.s2ab(xlsxData)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileName = 'products.xlsx';
    }

    if (fileData !== null && fileName !== '') {
      saveAs(fileData, fileName);
    }
  }

  s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }
}
