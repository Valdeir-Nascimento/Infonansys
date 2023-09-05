import { Injectable } from "@angular/core";
import { Categoria } from "../model/categoria.model";

@Injectable({
    providedIn: 'root'
})
export class WebStorageService {

    private storageKey = 'categorias';

    constructor() { }

    loadCategorias(): Categoria[] {
        const categoriaJson = localStorage.getItem(this.storageKey);
        if (categoriaJson) {
            return JSON.parse(categoriaJson);
        } else {
            return [];
        }
    }

    adicionarCategoria(categoria: Categoria): void {
        const categorias = this.loadCategorias();
        categorias.push(categoria);
        localStorage.setItem(this.storageKey, JSON.stringify(categorias));
    }

}
