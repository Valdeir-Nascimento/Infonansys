import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LancamentoService } from '../../../service/lancamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as toastr from "toastr";
import { CategoriaService } from '../../../service/categoria.service';
import { Lancamento } from '../../../model/lancamento.model';
import { Categoria } from '../../../model/categoria.model';

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

    imaskConfig = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ','
    };

    ptBR = {
        firstDayOfWeek: 0,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        monthNames: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
            'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Limpar'
    };

    typeOptions = [
        { value: 'despesa', text: 'Despesa' },
        { value: 'receita', text: 'Receita' }
    ];

    constructor(
        private lancamentoService: LancamentoService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private categoriaService: CategoriaService
    ) { }


    ngOnInit(): void {
        this.setCurrentAction();
        this.buildLancamentoForm();
        this.loadLancamento();
        this.loadCategorias();
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }


    submitForm() {
        this.submittingForm = true;
        if (this.currentAction == 'cadastrar') {
            this.cadastrar();
        } else {
            this.editar();
        }
    }

    cadastrar() {
        const lancamento: Lancamento = Object.assign(new Lancamento(), this.lancamentoForm?.value);
        this.lancamentoService.cadastrar(lancamento).subscribe(
            () => this.actionsForSuccess(),
            (error) => this.actionsForError(error)
        )
    }

    private setCurrentAction() {
        if (this.route.snapshot.url[0].path == 'cadastrar') {
            this.currentAction = 'cadastrar';
        } else {
            this.currentAction = 'editar';
        }
    }

    private buildLancamentoForm() {
        this.lancamentoForm = this.formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.minLength(2)]],
            descricao: [null],
            tipo: ["receita", [Validators.required]],
            valor: [null, [Validators.required]],
            data: [null, [Validators.required]],
            pago: [true, [Validators.required]],
            categoriaId: [null, [Validators.required]]
        })
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

    private editar() {
        const lancamento: Lancamento = Object.assign(new Lancamento(), this.lancamentoForm?.value);
        this.lancamentoService.editar(lancamento).subscribe(
            () => this.actionsForSuccess(),
            (error) => this.actionsForError(error)
        )
    }

    private actionsForSuccess() {
        toastr.success('Operação realizada com sucesso');
        this.router.navigate(['lancamentos']);
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


    private loadCategorias() {
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
