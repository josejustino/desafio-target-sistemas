export type Venda = {
  vendedor: string;
  valor: number;
}

export type DadosVendas = {
  vendas: Venda[];
}

export type ResultadoComissao = {
  vendedor: string;
  valorVenda: number;
  comissao: number;
}

export type ResumoVendedor = {
  vendedor: string;
  totalVendas: number;
  totalComissao: number;
}