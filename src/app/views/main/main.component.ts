import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { ApiService } from 'src/app/services/api.service';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  cartItems: Product[] = [];
  sidenavCartItemCount: number = 0;

  isSidenavOpen: boolean = false;

  offset: number = 0;
  limit: number = 10;

  selectedProduct: Product | undefined;

  @ViewChild(SidenavComponent) sidenavComponent!: SidenavComponent;

  constructor(private api: ApiService, private http: HttpClient) { }

  ngOnInit() {
    this.getProducts();
  }

  scrollCarousel(direction: 'left' | 'right') {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  getNextPage() {
    this.offset += this.limit;
    this.getProducts();
  }

  getPreviousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.getProducts();
    }
  }

  onLimitChange() {
    this.offset = 0;
    this.limit = parseInt(this.limit.toString(), 10);
    this.getProducts();
  }

  onSearchTitle(searchText: string) {
    searchText = searchText;

    if (searchText === '') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }

  getProducts() {
    this.api.getProducts(this.offset, this.limit).subscribe(data => {
      this.products = data
      this.filteredProducts = data
      this.filteredProducts = data.map(product => ({
        ...product,
        quantity: 1
      }));
    })
  }

  openModal(product: Product) {
    this.selectedProduct = product;
  }

  closeModal() {
    this.selectedProduct = undefined;
  }

  addToCart(product: Product) {
    this.sidenavComponent.addToCart(product);
  }

  onCartItemCountChange(count: number) {
    this.sidenavCartItemCount = count;
  }

}
