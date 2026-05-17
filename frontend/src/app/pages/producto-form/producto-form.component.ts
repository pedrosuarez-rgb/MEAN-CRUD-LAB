import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Producto } from '../../interfaces/producto';
import { Categoria } from '../../interfaces/categoria';

@Component({
    selector: 'app-producto-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent implements OnInit {
    titulo: string = 'Nuevo Producto';
    esEdicion: boolean = false;
    productoId: string = '';
    
    producto: Producto = {
        nombre: '',
        precio: 0,
        stock: 0,
        descripcion: '',
        categoria: ''
    };
    
    categorias: Categoria[] = [];
    loading: boolean = false;
    error: string = '';

    constructor(
        private productoService: ProductoService,
        private categoriaService: CategoriaService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.cargarCategorias();
        this.productoId = this.route.snapshot.params['id'];
        if (this.productoId) {
            this.esEdicion = true;
            this.titulo = 'Editar Producto';
            this.cargarProducto();
        }
    }

    cargarCategorias(): void {
        this.categoriaService.getCategorias().subscribe({
            next: (response) => {
                this.categorias = response.data.filter((c: Categoria) => c.estado === true);
            },
            error: (err) => {
                console.error('Error al cargar categorías:', err);
            }
        });
    }

    cargarProducto(): void {
        this.loading = true;
        this.productoService.getProducto(this.productoId).subscribe({
            next: (response) => {
                this.producto = response.data;
                // Si la categoría es un objeto, extraer el ID
                if (typeof this.producto.categoria === 'object') {
                    this.producto.categoria = this.producto.categoria._id || '';
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Error:', err);
                this.error = 'Error al cargar el producto';
                this.loading = false;
            }
        });
    }

    guardar(): void {
        if (!this.producto.nombre.trim()) {
            alert('El nombre es obligatorio');
            return;
        }
        if (this.producto.precio <= 0) {
            alert('El precio debe ser mayor a 0');
            return;
        }
        if (!this.producto.categoria) {
            alert('Debe seleccionar una categoría');
            return;
        }

        this.loading = true;
        
        if (this.esEdicion) {
            this.productoService.actualizarProducto(this.productoId, this.producto).subscribe({
                next: () => {
                    alert('Producto actualizado exitosamente');
                    this.router.navigate(['/productos']);
                },
                error: (err) => {
                    console.error('Error:', err);
                    alert('Error al actualizar el producto');
                    this.loading = false;
                }
            });
        } else {
            this.productoService.crearProducto(this.producto).subscribe({
                next: () => {
                    alert('Producto creado exitosamente');
                    this.router.navigate(['/productos']);
                },
                error: (err) => {
                    console.error('Error:', err);
                    alert('Error al crear el producto');
                    this.loading = false;
                }
            });
        }
    }
}