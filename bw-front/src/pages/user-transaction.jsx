import React, { useState, useEffect } from 'react';
import useAppStore from "../store/app.js";
import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";
import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import { fetchAllTrasactions, fetchUserTransactions } from '../api/index.js';
import { useNavigate } from 'react-router-dom';

import UILoading from '../components/ui/Loading/UILoading.jsx';
import Transaction from '../components/transaction/transaction-component.jsx';
import TransactionUser from '../components/transaction-user/transactions-user.jsx';

export default function MyTransactionHistory() {
    const app = useAppStore();
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
      const transactions = await fetchUserTransactions(telegramId);
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
    getUserTransactions(app.user.telegramId);
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

    <UIStatus
        balance={true}
        user={{
          firstName: app.user.firstName,
          balance: app.user.balance,
          profileImage: app.profileImage
        }}
      />
      <UIPageIndicator page="My Prize" />
      
      <div className="mt-4 px-4">
        <div className="mb-4">
                  </div>
        
      <div className="transaction-history h-[300px] flex flex-col gap-[8px] mt-[15px] p-[0px] overflow-y-scroll">
        {transactions.map((transaction, index) => (
          <TransactionUser
            key={`transaction-${index}`}
            transactionId={transaction.id}
            userName={app.user.firstName}
            userProfileImage={app.user.profileImage}
            cryptoName={transaction.cryptoName}
            amount={transaction.amount}
            date={transaction.date}
            description={transaction.description}
            userBalance={app.user.balance}
            onDelete={async () => await deleteTransactionHandler(transaction.id)}
          />
        ))}
      </div>
      </div>

      <button
        className="w-[90%] mx-auto mt-[15px] mb-[5px] bg-white h-[40px] text-black rounded-[8px]"
        onClick={() => navigate('/')}
        disabled={isLoading}
      >
        back
      </button>
    </>
  );
}