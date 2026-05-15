import { useEffect, useMemo, useState } from "react";
import {
    ArrowDownCircle,
    ArrowUpCircle,
    PiggyBank,
    Plus,
    Wallet,
} from "lucide-react";
import { CategoryChartCard, MonthlyChartCard } from "../components/ChartCard";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { SummaryCard } from "../components/SummaryCard";
import {
    TransactionModal,
    type TransactionFormData,
} from "../components/TransactionModal";
import { TransactionTable } from "../components/TransactionTable";
import { transactions as initialTransactions } from "../data/transactions";
import type { Transaction, TransactionType } from "../types/transaction";

type FilterType = "all" | TransactionType;
const LYNFINANCE_TRANSACTIONS = "LYNFINANCE_TRANSACTIONS";

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

function getStoredTransactions(): Transaction[] {
    const storedTransactions = localStorage.getItem(LYNFINANCE_TRANSACTIONS);

    if (!storedTransactions) {
        return initialTransactions;
    }

    try {
        const parsedTransactions = JSON.parse(storedTransactions);

        if (Array.isArray(parsedTransactions)) {
            return parsedTransactions as Transaction[];
        }

        return initialTransactions;
    } catch {
        return initialTransactions;
    }
}

export default function Dashboard() {
    const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactions, setTransactions] =
        useState<Transaction[]>(getStoredTransactions);

    useEffect(() => {
        localStorage.setItem(
            LYNFINANCE_TRANSACTIONS,
            JSON.stringify(transactions)
        );
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        if (selectedFilter === "all") {
            return transactions;
        }

        return transactions.filter(
            (transaction) => transaction.type === selectedFilter
        );
    }, [selectedFilter, transactions]);

    const totalIncome = useMemo(
        () =>
            transactions
                .filter((transaction) => transaction.type === "income")
                .reduce((acc, transaction) => acc + transaction.amount, 0),
        [transactions]
    );

    const totalExpenses = useMemo(
        () =>
            transactions
                .filter((transaction) => transaction.type === "expense")
                .reduce((acc, transaction) => acc + transaction.amount, 0),
        [transactions]
    );

    const balance = totalIncome - totalExpenses;
    const savedPercentage =
        totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

    function handleAddTransaction(transactionData: TransactionFormData) {
        const newTransaction: Transaction = {
            id: Date.now(),
            ...transactionData,
        };

        setTransactions((currentTransactions) => [
            newTransaction,
            ...currentTransactions,
        ]);
    }

    function handleResetTransactions() {
        localStorage.removeItem(LYNFINANCE_TRANSACTIONS);
        setTransactions(initialTransactions);
        setSelectedFilter("all");
    }

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Header />

                <section className="dashboard-toolbar">
                    <div className="filter-group" aria-label="Filtro de transações">
                        <button
                            type="button"
                            className={selectedFilter === "all" ? "active" : ""}
                            onClick={() => setSelectedFilter("all")}
                        >
                            Todas
                        </button>

                        <button
                            type="button"
                            className={selectedFilter === "income" ? "active" : ""}
                            onClick={() => setSelectedFilter("income")}
                        >
                            Entradas
                        </button>

                        <button
                            type="button"
                            className={selectedFilter === "expense" ? "active" : ""}
                            onClick={() => setSelectedFilter("expense")}
                        >
                            Saídas
                        </button>
                    </div>

                    <div className="transaction-actions">
                        <button
                            type="button"
                            className="secondary-button reset-button"
                            onClick={handleResetTransactions}
                        >
                            Resetar dados
                        </button>

                        <button
                            type="button"
                            className="primary-button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={18} />
                            Nova transação
                        </button>
                    </div>
                </section>

                <section className="summary-grid">
                    <SummaryCard
                        title="Saldo atual"
                        value={formatCurrency(balance)}
                        description="Valor disponível neste mês"
                        icon={Wallet}
                    />

                    <SummaryCard
                        title="Receitas"
                        value={formatCurrency(totalIncome)}
                        description="Entradas registradas"
                        icon={ArrowUpCircle}
                        variant="income"
                    />

                    <SummaryCard
                        title="Despesas"
                        value={formatCurrency(totalExpenses)}
                        description="Saídas registradas"
                        icon={ArrowDownCircle}
                        variant="expense"
                    />

                    <SummaryCard
                        title="Economia"
                        value={`${savedPercentage}%`}
                        description="Percentual economizado"
                        icon={PiggyBank}
                    />
                </section>

                <section className="charts-grid">
                    <MonthlyChartCard />
                    <CategoryChartCard />
                </section>

                <TransactionTable transactions={filteredTransactions} />
            </main>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTransaction}
            />
        </div>
    );
}
