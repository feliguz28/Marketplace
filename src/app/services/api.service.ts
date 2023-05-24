import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://api.escuelajs.co/api/v1/"

  constructor(private http:HttpClient) {}
  
  getProducts(offset: number, limit: number):Observable<Product[]>{
    let products = `${this.url}products?offset=${offset}&limit=${limit}`
    return this.http.get<Product[]>(products);
  }
}
