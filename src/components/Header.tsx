import { Bell, Search } from "lucide-react";

export function Header() {
    return (
        <header className="header">
            <div>
                <span className="eyebrow">Visão geral</span>
                <h1>Dashboard financeiro</h1>
                <p>Acompanhe entradas, gastos e evolução mensal em um só lugar.</p>
            </div>

            <div className="header-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Buscar transação..." />
                </div>

                <button className="icon-button" type="button" aria-label="Notificações">
                    <Bell size={18} />
                </button>

                <div className="user-avatar">KC</div>
            </div>
        </header>
    );
}