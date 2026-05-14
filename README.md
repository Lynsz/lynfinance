# LynFinance

Dashboard financeiro pessoal desenvolvido com React e TypeScript, criado como projeto de portfólio para praticar desenvolvimento Front-End moderno, componentização, responsividade, visualização de dados e organização de código.

## Visão geral

O LynFinance simula uma aplicação financeira pessoal onde o usuário consegue visualizar receitas, despesas, saldo atual, economia mensal, gráficos e histórico de transações.

O projeto foi desenvolvido com foco em apresentar uma interface profissional, limpa e responsiva, adequada para portfólio de vagas de Estágio em TI, Desenvolvimento Front-End e Front-End Júnior.

## Funcionalidades

- Dashboard financeiro com visão geral do mês;
- Cards de saldo, receitas, despesas e economia;
- Tabela com histórico de transações;
- Filtro por tipo de transação;
- Gráfico de receitas x despesas;
- Gráfico de gastos por categoria;
- Layout responsivo;
- Interface moderna em tema escuro;
- Dados mockados para simulação inicial.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- CSS
- Recharts
- Lucide React
- Git
- GitHub

## Conceitos praticados

- Componentização;
- Tipagem com TypeScript;
- Organização de pastas;
- Renderização de listas;
- Filtros com estado;
- Manipulação de dados mockados;
- Uso de gráficos no Front-End;
- Responsividade;
- Boas práticas de interface;
- Versionamento com Git e GitHub.

## Estrutura do projeto

```txt
src/
├── components/
│   ├── ChartCard.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── SummaryCard.tsx
│   └── TransactionTable.tsx
├── data/
│   └── transactions.ts
├── pages/
│   └── Dashboard.tsx
├── types/
│   └── transaction.ts
├── App.tsx
├── index.css
└── main.tsx