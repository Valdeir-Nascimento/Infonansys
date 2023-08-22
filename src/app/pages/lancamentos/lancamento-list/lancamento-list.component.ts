import { Component, OnInit } from '@angular/core';
import { Lancamento } from '../shared/lancamento.model';
import { LancamentoService } from '../shared/lancamento.service';

@Component({
    selector: 'app-lancamento-list',
    templateUrl: './lancamento-list.component.html',
    styleUrls: ['./lancamento-list.component.css']
})
export class LancamentoListComponent implements OnInit {

    lancamentos: Lancamento[] = [];

    constructor(private lancamentoService: LancamentoService) { }

    ngOnInit(): void {
        this.loadLancamentos();
    }

    loadLancamentos() {
        return this.lancamentoService.listar().subscribe(
            lancamentos => this.lancamentos = lancamentos,
            error => alert("Não foi possível carregar a lista de lançamentos")
        )
    }

    excluir(lancamento: Lancamento): void {
        const confirmacaoExclusao = confirm("Deseja realmente excluir este lançamento ?")
        if (confirmacaoExclusao) {
            this.lancamentoService.delete(lancamento.id!).subscribe(
                () => this.lancamentos = this.lancamentos.filter(element => element != lancamento),
                () => alert("Erro ao realizar exclusão de lançamento")
            );
        }
    }

}
