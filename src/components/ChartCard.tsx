import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const categoryData = [
    { name: "Alimentação", value: 380 },
    { name: "Transporte", value: 220 },
    { name: "Educação", value: 180 },
    { name: "Lazer", value: 79 },
];

const monthlyData = [
    { month: "Jan", income: 1800, expense: 1200 },
    { month: "Fev", income: 2100, expense: 1400 },
    { month: "Mar", income: 1900, expense: 1500 },
    { month: "Abr", income: 2400, expense: 1600 },
    { month: "Mai", income: 3200, expense: 859 },
];

const chartColors = ["#8b5cf6", "#06b6d4", "#22c55e", "#f97316"];

function formatCurrency(value: unknown) {
    const numberValue = typeof value === "number" ? value : Number(value ?? 0);

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(numberValue);
}

export function CategoryChartCard() {
    return (
        <section className="chart-card">
            <div className="section-title">
                <div>
                    <span>Categorias</span>
                    <h2>Gastos por categoria</h2>
                </div>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={85}
                            innerRadius={48}
                            paddingAngle={4}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell
                                    key={entry.name}
                                    fill={chartColors[index % chartColors.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="legend">
                {categoryData.map((item, index) => (
                    <div key={item.name}>
                        <span style={{ backgroundColor: chartColors[index] }} />
                        {item.name}
                    </div>
                ))}
            </div>
        </section>
    );
}

export function MonthlyChartCard() {
    return (
        <section className="chart-card wide">
            <div className="section-title">
                <div>
                    <span>Evolução</span>
                    <h2>Receitas x despesas</h2>
                </div>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Bar
                            dataKey="income"
                            name="Receitas"
                            fill="#22c55e"
                            radius={[8, 8, 0, 0]}
                        />
                        <Bar
                            dataKey="expense"
                            name="Despesas"
                            fill="#f43f5e"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}