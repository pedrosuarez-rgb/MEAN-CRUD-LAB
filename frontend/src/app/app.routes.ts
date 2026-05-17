import { Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CategoriaFormComponent } from './pages/categoria-form/categoria-form.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoFormComponent } from './pages/producto-form/producto-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/productos', pathMatch: 'full' },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'categorias/nuevo', component: CategoriaFormComponent },
    { path: 'categorias/editar/:id', component: CategoriaFormComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'productos/nuevo', component: ProductoFormComponent },
    { path: 'productos/editar/:id', component: ProductoFormComponent },
    { path: '**', redirectTo: '/productos' }
];