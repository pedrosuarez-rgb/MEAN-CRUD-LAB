import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria';

@Component({
    selector: 'app-categorias',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './categorias.component.html',
})
export class CategoriasComponent implements OnInit {
    categorias: Categoria[] = [];
    loading: boolean = true;
    error: string = '';

    constructor(private categoriaService: CategoriaService) { }

    ngOnInit(): void {
        this.cargarCategorias();
    }

    cargarCategorias(): void {
        this.loading = true;
        this.categoriaService.getCategorias().subscribe({
            next: (response) => {
                this.categorias = response.data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error:', err);
                this.error = 'Error al cargar las categorías';
                this.loading = false;
            }
        });
    }

    eliminarCategoria(id: string, nombre: string): void {
        if (confirm(`¿Estás seguro de eliminar la categoría "${nombre}"?`)) {
            this.categoriaService.eliminarCategoria(id).subscribe({
                next: () => {
                    this.categorias = this.categorias.filter(c => c._id !== id);
                    alert('Categoría eliminada exitosamente');
                },
                error: (err) => {
                    console.error('Error:', err);
                    alert('Error al eliminar la categoría');
                }
            });
        }
    }
}