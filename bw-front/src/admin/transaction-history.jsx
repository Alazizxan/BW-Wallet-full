import React, { useState, useEffect } from 'react';
import { fetchAllTrasactions, fetchUserTransactions } from '../api/index.js';
import { useNavigate } from 'react-router-dom';

import UILoading from '../components/ui/Loading/UILoading.jsx';
import Transaction from '../components/transaction/transaction-component.jsx';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const getAllTransactions = async () => {
    try {
      setIsLoading(true);
      const transactions = await fetchAllTrasactions();
      setTransactions(transactions);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Error fetching transactions. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTransactions = async (telegramId) => {
    try {
      setIsLoading(true);
      const transactions = await fetchAllTrasactions(telegramId);
      setTransactions(transactions);
    } catch (err) {
      console.error('Error fetching user transactions:', err);
      setError('Error fetching user transactions. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTransactionHandler = async (transactionId) => {
    try {
      setIsLoading(true);
      await deleteTransaction(transactionId);
      await getAllTransactions();
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError('Error deleting transaction. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  if (isLoading) {
    return <UILoading />;
  }

  if (error) {
    return <div className="text-red-500 font-bold">{error}</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div className="text-gray-400">No transactions found.</div>;
  }

  return (
    <>
      <div className="transaction-history h-[450px] flex flex-col gap-[8px] mt-[15px] p-[0px] overflow-y-scroll">
        {transactions.map((transaction, index) => (
          <Transaction
            key={`transaction-${index}`}
            transactionId={transaction.id}
            userName={transaction.user.firstName}
            userProfileImage={transaction.user.profileImage}
            cryptoName={transaction.cryptoName}
            amount={transaction.amount}
            date={transaction.date}
            description={transaction.description}
            userBalance={transaction.user.balance}
            onDelete={async () => await deleteTransactionHandler(transaction.id)}
          />
        ))}
      </div>

      <button
        className="w-[90%] mx-auto mt-[15px] mb-[5px] bg-white h-[40px] text-black rounded-[8px]"
        onClick={() => navigate('/admin/active')}
        disabled={isLoading}
      >
        Create Transaction
      </button>
    </>
  );
}