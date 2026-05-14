import { useMemo, useState } from "react";
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
import { TransactionTable } from "../components/TransactionTable";
import { transactions } from "../data/transactions";
import type { TransactionType } from "../types/transaction";

type FilterType = "all" | TransactionType;

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

export default function Dashboard() {
    const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

    const filteredTransactions = useMemo(() => {
        if (selectedFilter === "all") {
            return transactions;
        }

        return transactions.filter(
            (transaction) => transaction.type === selectedFilter
        );
    }, [selectedFilter]);

    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const balance = totalIncome - totalExpenses;
    const savedPercentage =
        totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

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

                    <button type="button" className="primary-button">
                        <Plus size={18} />
                        Nova transação
                    </button>
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
        </div>
    );
}