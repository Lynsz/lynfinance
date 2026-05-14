export type TransactionType = "income" | "expense";

export type TransactionCategory =
    | "Salário"
    | "Alimentação"
    | "Transporte"
    | "Moradia"
    | "Lazer"
    | "Educação"
    | "Freelance"
    | "Investimentos";

export interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
    date: string;
}