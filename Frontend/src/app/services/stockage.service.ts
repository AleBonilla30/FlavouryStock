import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stockage, StockageView } from '../models/stockageView';
// Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class StockageService {
  private apiUrl = 'http://localhost:3000/api/stockage'; 

  constructor(private http: HttpClient) { }


  getAllStockages(): Observable<StockageView[]> {
    return this.http.get<StockageView[]>(`${this.apiUrl}/getAllStockage`);
  }

  updateStockage(idIngrediente: number, stockData: Partial<Stockage>): Observable<Stockage> {
    const url = `${this.apiUrl}/updateStockage/${idIngrediente}`;
    console.log('URL de PATCH para actualizar stock:', url); 
    return this.http.patch<Stockage>(url, stockData);
  }
}
