import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private API_URL = 'http://localhost:3000/api/categorias';

    constructor(private http: HttpClient) { }

    getCategorias(): Observable<any> {
        return this.http.get<any>(this.API_URL);
    }

    getCategoria(id: string): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/${id}`);
    }

    crearCategoria(categoria: Categoria): Observable<any> {
        return this.http.post<any>(this.API_URL, categoria);
    }

    actualizarCategoria(id: string, categoria: Categoria): Observable<any> {
        return this.http.put<any>(`${this.API_URL}/${id}`, categoria);
    }

    eliminarCategoria(id: string): Observable<any> {
        return this.http.delete<any>(`${this.API_URL}/${id}`);
    }
}