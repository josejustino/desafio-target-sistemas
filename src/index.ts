import * as fs from 'node:fs';
import * as path from 'node:path';
import { DadosVendas } from './domain/comissao.types.js';
import { ComissaoService } from './services/comissaoService.js';
import { DadosEstoque } from './domain/estoque.types.js';
import { EstoqueService } from './services/estoqueService.js';
import { JurosService } from './services/jurosService.js';

function executarExercicio1() {
  try {
    const caminhoArquivo = path.join(__dirname, '../', 'data', 'vendas.json');

    if (!fs.existsSync(caminhoArquivo)) {
      console.error(`❌ Arquivo de vendas não encontrado em: ${caminhoArquivo}`);
      return;
    }

    const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
    const dados: DadosVendas = JSON.parse(conteudoArquivo);

    console.log('========================================');
    console.log('📊 EXERCÍCIO 1: CÁLCULO DE COMISSÕES');
    console.log('========================================\n');

    const resumo = ComissaoService.processarComissoes(dados.vendas);

    resumo.forEach((item) => {
      console.log(`Vendedor: ${item.vendedor}`);
      console.log(`  -> Total de Vendas: R$ ${item.totalVendas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      console.log(`  -> Total de Comissão: R$ ${item.totalComissao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      console.log('----------------------------------------');
    });

  } catch (error) {
    console.error('❌ Erro ao processar o exercício de comissões:', error);
  }
}

function executarExercicio2() {
  try {
    const caminhoArquivo = './data/estoque.json';

    if (!fs.existsSync(caminhoArquivo)) {
      console.error(`❌ Arquivo de estoque não encontrado em: ${caminhoArquivo}`);
      return;
    }

    const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
    const dados: DadosEstoque = JSON.parse(conteudoArquivo);

    console.log('\n========================================');
    console.log('📦 EXERCÍCIO 2: CONTROLE DE ESTOQUE');
    console.log('========================================\n');

    const estoqueService = new EstoqueService(dados.estoque);

    console.log('--- Estoque Inicial ---');
    estoqueService.obterProdutos().forEach((p) => {
      console.log(`[Cód: ${p.codigoProduto}] ${p.descricaoProduto} | Qtd: ${p.estoque}`);
    });

    console.log('\n--- Simulando Movimentações ---');

    // 1. Exemplo de Entrada
    const prodEntrada = estoqueService.movimentarEstoque('MOV-001', 101, 50, 'ENTRADA', 'Compra de reposição do fornecedor');
    console.log(`✅ [${prodEntrada.descricaoProduto}] Entrada de 50 unidades. Saldo final: ${prodEntrada.estoque}`);

    // 2. Exemplo de Saída
    const prodSaida = estoqueService.movimentarEstoque('MOV-002', 102, 15, 'SAIDA', 'Venda realizada para cliente balcão');
    console.log(`✅ [${prodSaida.descricaoProduto}] Saída de 15 unidades. Saldo final: ${prodSaida.estoque}`);

    console.log('\n--- Estoque Final Atualizado ---');
    estoqueService.obterProdutos().forEach((p) => {
      console.log(`[Cód: ${p.codigoProduto}] ${p.descricaoProduto} | Qtd Final: ${p.estoque}`);
    });

  } catch (error: any) {
    console.error('❌ Erro ao processar o exercício de estoque:', error.message);
  }
}

function executarExercicio3() {
  try {
    console.log('\n========================================');
    console.log('💰 EXERCÍCIO 3: CÁLCULO DE JUROS POR ATRASO');
    console.log('========================================\n');

    const valorOriginal = 1000.00;

    // Simulando um título vencido há 5 dias para demonstração
    const dataVencimentoFicticia = new Date();
    dataVencimentoFicticia.setDate(dataVencimentoFicticia.getDate() - 5);
    const dataVencimentoStr = dataVencimentoFicticia.toISOString().split('T')[0];

    const resultado = JurosService.calcularJuros(valorOriginal, dataVencimentoStr);

    console.log(`Valor Original: R$ ${resultado.valorOriginal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    console.log(`Data de Vencimento: ${resultado.dataVencimento}`);
    console.log(`Data de Hoje: ${resultado.dataAtual}`);
    console.log(`Dias em Atraso: ${resultado.diasAtraso} dias`);
    console.log(`Percentual de Multa Acumulado (2.5% ao dia): ${resultado.percentualMultaTotal}%`);
    console.log(`Valor dos Juros: R$ ${resultado.valorJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    console.log(`Valor Total com Juros: R$ ${resultado.valorTotalComJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    console.log('----------------------------------------');

  } catch (error: any) {
    console.error('❌ Erro ao processar o exercício de juros:', error.message);
  }
}

function iniciarSistema() {
  executarExercicio1();
  executarExercicio2();
  executarExercicio3();
}

iniciarSistema();