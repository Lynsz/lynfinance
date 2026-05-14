import {
    BarChart3,
    CreditCard,
    Goal,
    Home,
    Landmark,
    Settings,
    Wallet,
} from "lucide-react";

const menuItems = [
    {
        label: "Dashboard",
        icon: Home,
        active: true,
    },
    {
        label: "Transações",
        icon: CreditCard,
        active: false,
    },
    {
        label: "Carteira",
        icon: Wallet,
        active: false,
    },
    {
        label: "Metas",
        icon: Goal,
        active: false,
    },
    {
        label: "Relatórios",
        icon: BarChart3,
        active: false,
    },
    {
        label: "Configurações",
        icon: Settings,
        active: false,
    },
];

export function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">
                    <Landmark size={22} />
                </div>

                <div>
                    <strong>LynFinance</strong>
                    <span>Financial Dashboard</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.label}
                            className={`nav-item ${item.active ? "active" : ""}`}
                            type="button"
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="sidebar-card">
                <p>Meta do mês</p>
                <strong>Economizar R$ 500</strong>

                <div className="progress-bar">
                    <div className="progress-fill" />
                </div>

                <span>68% concluído</span>
            </div>
        </aside>
    );
}