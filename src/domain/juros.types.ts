export type EntradaJuros = {
  valorOriginal: number;
  dataVencimento: string;
}

export type ResultadoJuros = {
  valorOriginal: number;
  dataVencimento: string;
  dataAtual: string;
  diasAtraso: number;
  percentualMultaTotal: number;
  valorJuros: number;
  valorTotalComJuros: number;
}