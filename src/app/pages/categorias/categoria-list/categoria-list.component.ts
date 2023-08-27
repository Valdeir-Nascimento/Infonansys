import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../model/categoria.model';
import { CategoriaService } from '../../../service/categoria.service';


@Component({
    selector: 'app-categoria-list',
    templateUrl: './categoria-list.component.html',
    styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

    categorias: Categoria[] = [];

    constructor(private categoriaService: CategoriaService) { }

    ngOnInit(): void {
        this.loadCategorias();
    }

    loadCategorias() {
        return this.categoriaService.listar().subscribe(
            categories => this.categorias = categories,
            error => alert('Erro ao carregar a lista de categorias')
        )
    }

    excluir(categoria: Categoria) {
        const confirmacaoExclusao = confirm('Deseja realmente excluir esta categoria ?')
        if (confirmacaoExclusao) {
            this.categoriaService.excluir(categoria.id!).subscribe(
                () => this.categorias = this.categorias.filter(element => element != categoria),
                () => alert("Erro ao tentar excluir")
            );
        }
    }

}
