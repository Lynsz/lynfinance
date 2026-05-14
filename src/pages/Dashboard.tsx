import { ArrowDownCircle, ArrowUpCircle, PiggyBank, Wallet } from "lucide-react";
import { CategoryChartCard, MonthlyChartCard } from "../components/ChartCard";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { SummaryCard } from "../components/SummaryCard";
import { TransactionTable } from "../components/TransactionTable";
import { transactions } from "../data/transactions";

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

export default function Dashboard() {
    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const balance = totalIncome - totalExpenses;
    const savedPercentage = Math.round((balance / totalIncome) * 100);

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Header />

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

                <TransactionTable transactions={transactions} />
            </main>
        </div>
    );
}