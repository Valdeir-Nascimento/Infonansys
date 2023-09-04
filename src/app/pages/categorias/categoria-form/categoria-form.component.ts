import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../model/categoria.model';
import { CategoriaService } from '../../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import * as toastr from "toastr";

@Component({
    selector: 'app-categoria-form',
    templateUrl: './categoria-form.component.html',
    styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

    currentAction: string = "";
    categoriaForm!: FormGroup;
    pageTitle: string = "";
    serverErrorMessages: string[] = [];
    submittingForm: boolean = false;
    categoria: Categoria = new Categoria();

    constructor(
        private categoryService: CategoriaService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder

    ) { }

    ngOnInit(): void {
        this.setCurrentAction();
        this.buildFormCategoria();
        this.loadCategoria();
    }

    cadastrar() {
        const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm?.value);
        this.categoryService.cadastrar(categoria).subscribe(
            (categoria) => this.actionsForSuccess(categoria),
            (error) => this.actionsForError(error)
        )
    }

    editar() {
        const category: Categoria = Object.assign(new Categoria(), this.categoriaForm?.value);
        this.categoryService.editar(category).subscribe(
            (categoria) => this.actionsForSuccess(categoria),
            (error) => this.actionsForError(error)
        )
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

    // PRIVATE METHODS
    private setCurrentAction() {
        if (this.route.snapshot.url[0].path == 'cadastrar') {
            this.currentAction = 'cadastrar';
        } else {
            this.currentAction = 'editar';
        }
    }

    private buildFormCategoria() {
        this.categoriaForm = this.formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.minLength(2)]],
            descricao: [null]
        })
    }

    private loadCategoria() {
        if (this.currentAction == 'editar') {
            this.route.paramMap.pipe(
                switchMap(params => this.categoryService.buscarPorId(Number(params.get('id'))))
            ).subscribe(
                (category) => {
                    this.categoria = category;
                    this.categoriaForm?.patchValue(category) //Binding load category data to CategoryForm
                },
                (error) => alert('Ocorreu um erro no servidor, tente novamente mais tarde!')
            );
        }
    }

    private setPageTitle() {
        if (this.currentAction == 'cadastrar') {
            this.pageTitle = 'Cadastrar Nova Categoria';
        } else {
            const categoryName = this.categoria.nome || '';
            this.pageTitle = 'Editando Categoria: ' + categoryName;
        }
    }

    private actionsForSuccess(categoria: Categoria) {
        toastr.success('Operação realizada com sucesso');
        this.router.navigate(['categorias']);
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
}
