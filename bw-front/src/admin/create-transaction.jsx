import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTransaction } from "../api/index.js";

export default function CreateTransaction() {
    const [isLoading, setIsLoading] = useState(false);
    const [transaction, setTransaction] = useState({
        cryptoName: "",   // Kriptovalyuta nomi (string)
        amount: "",       // Miqdor (float)
        description: "",  // Tavsif (string)
        telegramId: "",   // Telegram ID (string)
    });
    const [errorMessage, setErrorMessage] = useState(""); // Xatolik xabari uchun holat

    const navigate = useNavigate();
    const { telegramId } = useParams(); // URL orqali kelgan telegramId

    useEffect(() => {
        if (telegramId) {
            // Telegram IDni avtomatik to'ldirish
            setTransaction((prev) => ({ ...prev, telegramId }));
        }
    }, [telegramId]);




const handleCreate = async () => {
    setIsLoading(true);
    setErrorMessage("");

    // More rigorous validation
    if (!transaction.cryptoName) {
        setErrorMessage("Kriptovalyuta nomini kiriting");
        setIsLoading(false);
        return;
    }

    const amount = parseFloat(transaction.amount);
    if (isNaN(amount) || amount <= 0) {
        setErrorMessage("To'g'ri miqdorni kiriting");
        setIsLoading(false);
        return;
    }

    if (!transaction.description) {
        setErrorMessage("Tavsif bo'sh bo'lmasligi kerak");
        setIsLoading(false);
        return;
    }

    const transactionData = {
        cryptoName: transaction.cryptoName.trim(),
        amount: amount,
        description: transaction.description.trim(),
        telegramId: transaction.telegramId.trim() || null
    };

    try {
        const response = await createTransaction(transactionData);
        console.log('Transaction created:', response);
        navigate("/admin/transactions");
    } catch (error) {
        console.error("Tranzaksiya yaratishda xato:", error.response?.data || error.message);
        setErrorMessage(error.response?.data?.message || "Tranzaksiya yaratishda xatolik");
    } finally {
        setIsLoading(false);
    }
};

const handleChange = (e) => {
    const {name, value} = e.target;
    setTransaction((prevTask) => ({
        ...prevTask,
        [name]: value,
    }));
};


    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-center mb-6">Tranzaksiya yaratish</h1>
            <div className="max-w-md mx-auto space-y-4">
                <input
                    type="text"
                    name="cryptoName"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={transaction.cryptoName}
                    placeholder="Kriptovalyuta nomini kiriting"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="amount"
                    className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={transaction.amount}
                    placeholder="Miqdorni kiriting"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={transaction.description}
                    placeholder="Tranzaksiya tavsifini kiriting"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="telegramId"
                    className="w-full text-gray-600 px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    value={transaction.telegramId}
                    placeholder={transaction.telegramId || "Telegram ID"}
                    disabled
                />
                {errorMessage && (
                    <div className="text-red-600 text-center">
                        {errorMessage}
                    </div>
                )}
                <button
                    className={`w-full py-2 text-white rounded-md transition-colors ${
                        isLoading 
                        ? "bg-gray-500 cursor-not-allowed" 
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    onClick={handleCreate}
                    disabled={isLoading}
                >
                    {isLoading ? "Yaratilyapti..." : "Tranzaksiya yaratish"}
                </button>
            </div>
        </div>
    );
}