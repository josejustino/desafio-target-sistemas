export type Produto = {
  codigoProduto: number;
  descricaoProduto: string;
  estoque: number;
}

export type DadosEstoque = {
  estoque: Produto[];
}

export type TipoMovimentacao = 'ENTRADA' | 'SAIDA';

export type MovimentacaoEstoque = {
  id: string;
  codigoProduto: number;
  quantidade: number;
  tipo: TipoMovimentacao;
  descricao: string;
  dataHora: Date;
}