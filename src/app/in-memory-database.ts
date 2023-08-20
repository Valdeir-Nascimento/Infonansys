import { InMemoryDbService } from "angular-in-memory-web-api";
import { Categoria } from "./pages/categorias/shared/categoria.model";

export class InMemoryDatabase extends InMemoryDbService {

    createDb() {

        const categorias: Categoria[] = [
            { id: 1, nome: "Moradia", descricao: 'Pagamentos de Contas da Casa' },
            { id: 2, nome: "Saúde", descricao: 'Plano de Saúde e Remédios' },
            { id: 3, nome: "Lazer", descricao: 'Cinema, parques, praia, etc' },
            { id: 4, nome: "Salário", descricao: 'Recebimento de Salário' },
            { id: 5, nome: "Freelas", descricao: 'Trabalhos como freelancer' },
        ];

        return { categorias }

    }

}

