import { Component, OnInit } from '@angular/core';
import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';


@Component({
    selector: 'app-categoria-list',
    templateUrl: './categoria-list.component.html',
    styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

    categorias: Categoria[] = [
        // { id: 1, nome: "Moradia", descricao: 'Pagamentos de Contas da Casa' },
        // { id: 2, nome: "Saúde", descricao: 'Plano de Saúde e Remédios' },
        // { id: 3, nome: "Lazer", descricao: 'Cinema, parques, praia, etc' },
        // { id: 4, nome: "Salário", descricao: 'Recebimento de Salário' },
        // { id: 5, nome: "Freelas", descricao: 'Trabalhos como freelancer' }
    ];

    categoriasTemp: Categoria[] = []

    constructor(private categoriaService: CategoriaService) { }

    ngOnInit(): void {
        this.categoriaService.listar().subscribe(
            categories => this.categorias = categories,
            error => alert("Erro ao carregar a lista")
        )

        console.log(this.categorias);

    }

}
