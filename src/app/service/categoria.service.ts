import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Categoria } from "../model/categoria.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    private apiPath: string = "http://localhost:3000/categorias";

    constructor(private http: HttpClient) { }

    listar(): Observable<Categoria[]> {
        return this.http.get(`${this.apiPath}`).pipe(
            catchError(this.handleError),
            map(this.convertToCategorias)
        );
    }

    buscarPorId(id: number): Observable<Categoria> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToCategoria)
        )
    }

    cadastrar(categoria: Categoria): Observable<Categoria> {
        return this.http.post(this.apiPath, categoria).pipe(
            catchError(this.handleError),
            map(this.jsonDataToCategoria)
        );
    }

    editar(categoria: Categoria): Observable<Categoria> {
        const url = `${this.apiPath}/${categoria.id}`;
        return this.http.put(url, categoria).pipe(
            catchError(this.handleError),
            map(() => categoria)
        )
    }

    excluir(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            catchError(this.handleError),
            map(() => null)
        )
    }


    private convertToCategorias(jsonData: any[]): Categoria[] {
        const categorias: Categoria[] = [];
        jsonData.forEach(item => categorias.push(item as Categoria));
        return categorias;
    }

    private jsonDataToCategoria(jsonData: any): Categoria {
        return jsonData as Categoria;
    }

    private handleError(error: any): Observable<any> {
        return throwError(error);
    }

}
