import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria';

@Component({
    selector: 'app-categoria-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './categoria-form.component.html',
})
export class CategoriaFormComponent implements OnInit {
    titulo: string = 'Nueva Categoría';
    esEdicion: boolean = false;
    categoriaId: string = '';
    
    categoria: Categoria = {
        nombre: '',
        descripcion: '',
        estado: true
    };
    
    loading: boolean = false;
    error: string = '';

    constructor(
        private categoriaService: CategoriaService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.categoriaId = this.route.snapshot.params['id'];
        if (this.categoriaId) {
            this.esEdicion = true;
            this.titulo = 'Editar Categoría';
            this.cargarCategoria();
        }
    }

    cargarCategoria(): void {
        this.loading = true;
        this.categoriaService.getCategoria(this.categoriaId).subscribe({
            next: (response) => {
                this.categoria = response.data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error:', err);
                this.error = 'Error al cargar la categoría';
                this.loading = false;
            }
        });
    }

    guardar(): void {
        if (!this.categoria.nombre.trim()) {
            alert('El nombre es obligatorio');
            return;
        }

        this.loading = true;
        
        if (this.esEdicion) {
            this.categoriaService.actualizarCategoria(this.categoriaId, this.categoria).subscribe({
                next: () => {
                    alert('Categoría actualizada exitosamente');
                    this.router.navigate(['/categorias']);
                },
                error: (err) => {
                    console.error('Error:', err);
                    alert('Error al actualizar la categoría');
                    this.loading = false;
                }
            });
        } else {
            this.categoriaService.crearCategoria(this.categoria).subscribe({
                next: () => {
                    alert('Categoría creada exitosamente');
                    this.router.navigate(['/categorias']);
                },
                error: (err) => {
                    console.error('Error:', err);
                    alert('Error al crear la categoría');
                    this.loading = false;
                }
            });
        }
    }
}