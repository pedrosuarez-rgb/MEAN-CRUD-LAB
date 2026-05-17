export interface Producto {
    _id?: string;
    nombre: string;
    precio: number;
    stock: number;
    descripcion: string;
    categoria: string | { _id: string, nombre: string };
    createdAt?: Date;
    updatedAt?: Date;
}