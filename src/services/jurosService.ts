import { ResultadoJuros } from '../domain/juros.types.js';

export class JurosService {
  private static TAXA_JUROS_DIARIA = 0.025; // 2,5% ao dia

  public static calcularJuros(valorOriginal: number, dataVencimentoStr: string, dataAtualStr?: string): ResultadoJuros {
    if (valorOriginal <= 0) {
      throw new Error('O valor original deve ser maior que zero.');
    }

    const dataVencimento = new Date(dataVencimentoStr);
    const dataAtual = dataAtualStr ? new Date(dataAtualStr) : new Date();

    dataVencimento.setHours(0, 0, 0, 0);
    dataAtual.setHours(0, 0, 0, 0);

    const diferencaEmMilissegundos = dataAtual.getTime() - dataVencimento.getTime();
    const diasAtraso = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

    let valorJuros = 0;
    let percentualMultaTotal = 0;

    if (diasAtraso > 0) {
      percentualMultaTotal = diasAtraso * this.TAXA_JUROS_DIARIA;
      valorJuros = valorOriginal * percentualMultaTotal;
    }

    const valorTotalComJuros = valorOriginal + valorJuros;

    return {
      valorOriginal: Number(valorOriginal.toFixed(2)),
      dataVencimento: dataVencimento.toISOString().split('T')[0],
      dataAtual: dataAtual.toISOString().split('T')[0],
      diasAtraso: diasAtraso > 0 ? diasAtraso : 0,
      percentualMultaTotal: Number((percentualMultaTotal * 100).toFixed(2)),
      valorJuros: Number(valorJuros.toFixed(2)),
      valorTotalComJuros: Number(valorTotalComJuros.toFixed(2))
    };
  }
}