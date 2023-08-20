import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Categoria } from "./categoria.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    private apiPath: string = "http://localhost:3000";

    constructor(private http: HttpClient) { }

    listar(): Observable<Categoria[]> {
        return this.http.get(`${this.apiPath}/categorias`).pipe(
            catchError(this.handleError),
            map(this.convertToCategorias)
        );
    }

    buscarPorId(idCategoria: number): Observable<Categoria> {
        const url = `${this.apiPath}/${idCategoria}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToCategoria)
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
