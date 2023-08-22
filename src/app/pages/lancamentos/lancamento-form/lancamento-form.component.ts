import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LancamentoService } from '../shared/lancamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as toastr from "toastr";
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { Lancamento } from '../shared/lancamento.model';
import { Categoria } from '../../categorias/shared/categoria.model';

@Component({
    selector: 'app-lancamento-form',
    templateUrl: './lancamento-form.component.html',
    styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent implements OnInit {

    currentAction: string = "";
    lancamentoForm!: FormGroup;
    pageTitle: string = "";
    serverErrorMessages: string[] = [];
    submittingForm: boolean = false;
    lancamento: Lancamento = new Lancamento();
    categorias: Categoria[] = [];

    constructor(
        private lancamentoService: LancamentoService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private categoriaService: CategoriaService
    ) { }


    ngOnInit(): void {
    }


    private loadLancamento() {
        if (this.currentAction == 'editar') {
            this.route.paramMap.pipe(
                switchMap(params => this.lancamentoService.buscarPorId(Number(params.get('id'))))
            ).subscribe(
                (lancamento) => {
                    this.lancamento = lancamento;
                    this.lancamentoForm?.patchValue(lancamento) //Vinculando dados de entrada de carga ao EntryForm
                },
                (error) => alert('Ocorreu um erro no servidor, tente novamente mais tarde!')
            );
        }
    }


    cadastrar() {
        const lancamento: Lancamento = Object.assign(new Lancamento(), this.lancamentoForm?.value);
        this.lancamentoService.cadastrar(lancamento).subscribe(
            (lancamento) => this.actionsForSuccess(lancamento),
            (error) => this.actionsForError(error)
        )
    }


    private editarLancamento() {
        const lancamento: Lancamento = Object.assign(new Lancamento(), this.lancamentoForm?.value);
        this.lancamentoService.editar(lancamento).subscribe(
            (lancamento) => this.actionsForSuccess(lancamento),
            (error) => this.actionsForError(error)
        )
    }

    private actionsForSuccess(lancamento: Lancamento) {
        toastr.success('Operação realizada com sucesso');
        this.router.navigateByUrl('lancamentos', { skipLocationChange: true }).then(
            () => this.router.navigate(['lancamentos', lancamento.id, 'editar'])
        )
    }

    private actionsForError(error: any) {
        toastr.error('Ocorreu um erro ao processar a sua solicitação');
        this.submittingForm = false;
        if (error.status == 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessages = ["Falha na comunicação com servidor. Por favor, tente mais tarde."]
        }
    }


    private loadCategories() {
        this.categoriaService.listar().subscribe(categorias => this.categorias = categorias)
    }

    private setPageTitle() {
        if (this.currentAction == 'cadastrar') {
            this.pageTitle = 'Cadastro Novo Lançamento';
        } else {
            const nomeLancamento = this.lancamento.nome || '';
            this.pageTitle = 'Editando Lançamento: ' + nomeLancamento;
        }
    }

}
