import { X } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type {
    TransactionCategory,
    TransactionType,
} from "../types/transaction";

export interface TransactionFormData {
    title: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
    date: string;
}

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (transaction: TransactionFormData) => void;
}

const categories: TransactionCategory[] = [
    "Salário",
    "Alimentação",
    "Transporte",
    "Moradia",
    "Lazer",
    "Educação",
    "Freelance",
    "Investimentos",
];

const initialFormData = {
    title: "",
    amount: "",
    type: "expense" as TransactionType,
    category: "Alimentação" as TransactionCategory,
    date: new Date().toISOString().split("T")[0],
};

export function TransactionModal({
    isOpen,
    onClose,
    onSubmit,
}: TransactionModalProps) {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState("");

    if (!isOpen) {
        return null;
    }

    function handleClose() {
        setError("");
        setFormData(initialFormData);
        onClose();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const amount = Number(formData.amount);

        if (
            !formData.title.trim() ||
            !formData.amount ||
            Number.isNaN(amount) ||
            amount <= 0 ||
            !formData.date
        ) {
            setError("Preencha todos os campos obrigatórios com valores válidos.");
            return;
        }

        onSubmit({
            title: formData.title.trim(),
            amount,
            type: formData.type,
            category: formData.category,
            date: formData.date,
        });

        handleClose();
    }

    return (
        <div className="modal-backdrop" role="presentation">
            <div className="transaction-modal" role="dialog" aria-modal="true">
                <div className="modal-header">
                    <div>
                        <span>Nova movimentação</span>
                        <h2>Criar transação</h2>
                    </div>

                    <button
                        type="button"
                        className="modal-close-button"
                        aria-label="Fechar modal"
                        onClick={handleClose}
                    >
                        <X size={18} />
                    </button>
                </div>

                <form className="transaction-form" onSubmit={handleSubmit}>
                    <label>
                        Descrição
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(event) =>
                                setFormData((currentData) => ({
                                    ...currentData,
                                    title: event.target.value,
                                }))
                            }
                            placeholder="Ex: Mercado"
                        />
                    </label>

                    <label>
                        Valor
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.amount}
                            onChange={(event) =>
                                setFormData((currentData) => ({
                                    ...currentData,
                                    amount: event.target.value,
                                }))
                            }
                            placeholder="0,00"
                        />
                    </label>

                    <label>
                        Tipo
                        <select
                            value={formData.type}
                            onChange={(event) =>
                                setFormData((currentData) => ({
                                    ...currentData,
                                    type: event.target.value as TransactionType,
                                }))
                            }
                        >
                            <option value="income">Entrada</option>
                            <option value="expense">Saída</option>
                        </select>
                    </label>

                    <label>
                        Categoria
                        <select
                            value={formData.category}
                            onChange={(event) =>
                                setFormData((currentData) => ({
                                    ...currentData,
                                    category: event.target.value as TransactionCategory,
                                }))
                            }
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Data
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(event) =>
                                setFormData((currentData) => ({
                                    ...currentData,
                                    date: event.target.value,
                                }))
                            }
                        />
                    </label>

                    {error && <p className="form-error">{error}</p>}

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={handleClose}
                        >
                            Cancelar
                        </button>

                        <button type="submit" className="primary-button">
                            Adicionar transação
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
