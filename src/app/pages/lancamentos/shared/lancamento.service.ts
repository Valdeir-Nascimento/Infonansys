import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { Lancamento } from './lancamento.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LancamentoService {

    private apiPath: string = "http://localhost:3000/lancamentos";

    constructor(
        private http: HttpClient,
        private categoriaService: CategoriaService
    ) { }

    listar(): Observable<Lancamento[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToLancamentos)
        );
    }

    buscarPorId(id: number): Observable<Lancamento> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToLancamento)
        );
    }


    private jsonDataToLancamentos(jsonData: any[]): Lancamento[] {
        const entries: Lancamento[] = [];
        jsonData.forEach(element => {
            const entry = Object.assign(new Lancamento, element);
            entries.push(entry);
        });
        return entries;
    }

    private jsonDataToLancamento(jsonData: any): Lancamento {
        return Object.assign(new Lancamento, jsonData);
    }

    private handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO =>", error);
        return throwError(error);
    }

}
