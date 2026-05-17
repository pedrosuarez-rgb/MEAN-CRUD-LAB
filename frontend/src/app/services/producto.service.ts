import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private API_URL = 'http://localhost:3000/api/productos';

    constructor(private http: HttpClient) { }

    getProductos(): Observable<any> {
        return this.http.get<any>(this.API_URL);
    }

    getProducto(id: string): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/${id}`);
    }

    crearProducto(producto: Producto): Observable<any> {
        return this.http.post<any>(this.API_URL, producto);
    }

    actualizarProducto(id: string, producto: Producto): Observable<any> {
        return this.http.put<any>(`${this.API_URL}/${id}`, producto);
    }

    eliminarProducto(id: string): Observable<any> {
        return this.http.delete<any>(`${this.API_URL}/${id}`);
    }
}