# 🎯 Desafio Técnico - Target Sistemas

Repositório contendo a solução para o processo seletivo da **Target Sistemas**, desenvolvido com foco em **Clean Code**, **TypeScript**, **Princípio de Responsabilidade Única (SRP)** e arquitetura modular moderna.

## 🚀 Tecnologias Utilizadas
* **Node.js** (Versão 24+)
* **TypeScript** (Com tipagem estrita e ES Modules)
* **Módulos Nativos do Node.js** (`node:fs`) sem dependências externas desnecessárias.

---

## 📂 Estrutura do Projeto

O projeto foi planejado de forma limpa e organizada, separando as entidades de domínio, as regras de negócio isoladas (serviços) e os dados de entrada:

```text
desafio-target-sistemas/
├── data/
│   ├── vendas.json          # Registros de vendas do time comercial (Exercício 1)
│   └── estoque.json         # Produtos e saldos iniciais do depósito (Exercício 2)
├── src/
│   ├── domain/              # Interfaces e contratos de tipagem TypeScript
│   │   ├── comissao.types.ts
│   │   ├── estoque.types.ts
│   │   └── juros.types.ts
│   ├── services/            # Camada de regras de negócio isoladas (SRP)
│   │   ├── comissaoService.ts
│   │   ├── estoqueService.ts
│   │   └── jurosService.ts
│   └── index.ts             # Ponto de entrada / Orquestrador dos desafios
├── package.json
├── tsconfig.json
└── README.md
```

## 📋 Pré-requisitos e Como Executar
Para rodar o projeto localmente, certifique-se de ter o Node.js instalado na versão 24 ou superior.

1. Clone o repositório:

```bash
git clone [https://github.com/josejustino/desafio-target-sistemas.git](https://github.com/josejustino/desafio-target-sistemas.git)
cd desafio-target-sistemas
```

2. Instale as dependências de desenvolvimento (TypeScript e utilitários de execução):

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento (com hot reload nativo):

```bash
npm run dev
```

## 🛠️ Descrição dos Exercícios Resolvidos

### 📊 Exercício 1: Cálculo de Comissões de Vendas
- **Objetivo:** Ler o arquivo JSON contendo as vendas da equipe comercial e calcular a comissão de cada vendedor com base nas regras estabelecidas:

  - Vendas abaixo de R$ 100,00: Não geram comissão (0%).

  - Vendas abaixo de R$ 500,00: Geram 1% de comissão.

  - A partir de R$ 500,00: Geram 5% de comissão.

- **Abordagem:** O serviço agrupa os valores por vendedor, aplica as faixas condicionais de forma isolada e consolida os totais gerais de vendas e comissões.

### 📦 Exercício 2: Controle de Estoque
- **Objetivo:** Gerenciar as movimentações de entrada e saída dos produtos do depósito a partir de um identificador único e uma descrição do tipo de movimentação, retornando o saldo final atualizado.

- **Abordagem:** Utilização de uma classe de serviço (EstoqueService) que valida a existência do produto, impede estoques negativos em caso de saídas e mantém o histórico completo das movimentações realizadas.

### 💰 Exercício 3: Cálculo de Juros por Atraso
- **Objetivo:** Calcular o valor dos juros e da multa de um título a partir do valor original e da data de vencimento comparada com a data atual, aplicando a taxa de 2,5% ao dia.

- **Abordagem:** Normalização das datas desconsiderando fuso-horários, cálculo preciso dos dias de atraso e aplicação proporcional da taxa sobre o montante original.

## 💡 Autor
Desenvolvido por José Justino como parte do processo seletivo para a Target Sistemas.