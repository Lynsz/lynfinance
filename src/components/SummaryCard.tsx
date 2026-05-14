import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
    variant?: "default" | "income" | "expense";
}

export function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
    variant = "default",
}: SummaryCardProps) {
    return (
        <article className={`summary-card ${variant}`}>
            <div className="summary-card-header">
                <span>{title}</span>

                <div className="summary-icon">
                    <Icon size={20} />
                </div>
            </div>

            <strong>{value}</strong>
            <p>{description}</p>
        </article>
    );
}