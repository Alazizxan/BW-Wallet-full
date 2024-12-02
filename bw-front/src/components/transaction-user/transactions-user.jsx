import React from 'react';

const TransactionUser = ({
  transactionId,
  userName,
  userProfileImage,
  cryptoName,
  amount,
  date,
  description,
  userBalance,
  onDelete,
}) => {
  return (
    <div className="bg-[rgba(26,26,27,0.5)] backdrop-blur-[15px] shadow-lg border border-[rgba(255,255,255,0.1)] text-white rounded-lg shadow-lg p-4  flex justify-between items-center">
      <div className="flex items-center">
        
        <div>
          <p className="font-medium">{userName}</p>
          
         
        </div>
      </div>
      <div className="text-right">
      <p className="font-medium">{amount}-{cryptoName}</p>
      </div>
      <div className="text-right">
      <p className="text-gray-400">{new Date(date).toLocaleDateString()}</p>
        
      </div>
      
    </div>
  );
};

export default TransactionUser;