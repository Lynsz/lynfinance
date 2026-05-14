import type { Transaction } from "../types/transaction";

interface TransactionTableProps {
    transactions: Transaction[];
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        timeZone: "UTC",
    }).format(new Date(date));
}

export function TransactionTable({ transactions }: TransactionTableProps) {
    return (
        <section className="table-card">
            <div className="section-title">
                <div>
                    <span>Histórico</span>
                    <h2>Últimas transações</h2>
                </div>

                <button type="button">Ver todas</button>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{transaction.title}</td>
                                    <td>{transaction.category}</td>
                                    <td>{formatDate(transaction.date)}</td>
                                    <td>
                                        <span className={`badge ${transaction.type}`}>
                                            {transaction.type === "income" ? "Entrada" : "Saída"}
                                        </span>
                                    </td>
                                    <td
                                        className={
                                            transaction.type === "income"
                                                ? "amount-income"
                                                : "amount-expense"
                                        }
                                    >
                                        {transaction.type === "expense" ? "- " : "+ "}
                                        {formatCurrency(transaction.amount)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="empty-state">
                                    Nenhuma transação encontrada para este filtro.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}