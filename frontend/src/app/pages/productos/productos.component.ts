import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
    selector: 'app-productos',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {
    productos: Producto[] = [];
    loading: boolean = true;
    error: string = '';

    constructor(private productoService: ProductoService) { }

    ngOnInit(): void {
        this.cargarProductos();
    }

    cargarProductos(): void {
        this.loading = true;
        this.productoService.getProductos().subscribe({
            next: (response) => {
                this.productos = response.data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error:', err);
                this.error = 'Error al cargar los productos';
                this.loading = false;
            }
        });
    }

    eliminarProducto(id: string, nombre: string): void {
        if (confirm(`¿Estás seguro de eliminar el producto "${nombre}"?`)) {
            this.productoService.eliminarProducto(id).subscribe({
                next: () => {
                    this.productos = this.productos.filter(p => p._id !== id);
                    alert('Producto eliminado exitosamente');
                },
                error: (err) => {
                    console.error('Error:', err);
                    alert('Error al eliminar el producto');
                }
            });
        }
    }
}