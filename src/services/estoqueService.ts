import { Produto, MovimentacaoEstoque, TipoMovimentacao } from '../domain/estoque.types.js';

export class EstoqueService {
  private produtos: Produto[];
  private historicoMovimentacoes: MovimentacaoEstoque[] = [];

  constructor(produtosIniciais: Produto[]) {
    this.produtos = JSON.parse(JSON.stringify(produtosIniciais));
  }

  public obterProdutos(): Produto[] {
    return this.produtos;
  }

  public movimentarEstoque(
    idMovimentacao: string,
    codigoProduto: number,
    quantidade: number,
    tipo: TipoMovimentacao,
    descricao: string
  ): Produto {
    if (quantidade <= 0) {
      throw new Error('A quantidade da movimentação deve ser maior que zero.');
    }

    const produto = this.produtos.find((p) => p.codigoProduto === codigoProduto);

    if (!produto) {
      throw new Error(`Produto com código ${codigoProduto} não encontrado no estoque.`);
    }

    if (tipo === 'SAIDA') {
      if (produto.estoque < quantidade) {
        throw new Error(
          `Estoque insuficiente para o produto "${produto.descricaoProduto}". Estoque atual: ${produto.estoque}, Tentativa de saída: ${quantidade}`
        );
      }
      produto.estoque -= quantidade;
    } else if (tipo === 'ENTRADA') {
      produto.estoque += quantidade;
    } else {
      throw new Error('Tipo de movimentação inválido. Utilize "ENTRADA" ou "SAIDA".');
    }

    const novaMovimentacao: MovimentacaoEstoque = {
      id: idMovimentacao,
      codigoProduto,
      quantidade,
      tipo,
      descricao,
      dataHora: new Date()
    };

    this.historicoMovimentacoes.push(novaMovimentacao);

    return produto;
  }

  public obterHistorico(): MovimentacaoEstoque[] {
    return this.historicoMovimentacoes;
  }
}