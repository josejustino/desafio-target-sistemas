import { ResumoVendedor, Venda } from '../domain/comissao.types'

export class ComissaoService {
  public static calcularValorComissao(valorVenda: number): number {
    if (valorVenda < 100.00) {
      return 0;
    }
    if (valorVenda < 500.00) {
      return valorVenda * 0.01;
    }
    return valorVenda * 0.05;
  }

  public static processarComissoes(vendas: Venda[]): ResumoVendedor[] {
    const resumoMap = new Map<string, { totalVendas: number; totalComissao: number }>();

    for (const venda of vendas) {
      const comissao = this.calcularValorComissao(venda.valor);

      const atual = resumoMap.get(venda.vendedor) || { totalVendas: 0, totalComissao: 0 };
      resumoMap.set(venda.vendedor, {
        totalVendas: atual.totalVendas + venda.valor,
        totalComissao: atual.totalComissao + comissao
      })
    }

    return Array.from(resumoMap.entries()).map(([vendedor, dados]) => ({
      vendedor,
      totalVendas: Number(dados.totalVendas.toFixed(2)),
      totalComissao: Number(dados.totalComissao.toFixed(2))
    }))
  }
}