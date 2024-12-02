import './Active.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import StarIcon from "../../assets/images/star.svg";
import NewIcon from "../../assets/images/star1.svg";

const ActiveCard = ({ user, admin }) => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    // Wallet manzilini nusxalash funksiyasi
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(user.walletAddress);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error("Failed to copy wallet address:", error);
        }
    };

    if (!admin) {
        return (
            <div className="task">
                <div className="task__info">
                    <img src={user.activation ? NewIcon : StarIcon} alt="icon" />
                    <div className="task__text">
                        <span className={`task__title`}>
                            {user.activation ? 'Premium User' : 'Simple User'}
                        </span>
                        <span className="task__description">
                            {user.activation ? 'active' : 'deactive'}
                        </span>
                    </div>
                </div>

                {!user.activation ? (
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            // Har qanday aktivatsiya funksiyasini bu yerga joylashtirish mumkin
                            console.log("Activate clicked");
                        }}
                        className="task__button"
                    >
                        Activate
                    </a>
                ) : (
                    <span className="task__button2 disabled">
                        Active
                    </span>
                )}
            </div>
        );
    } else {
        return (
            <div className="task relative">
                <div className="task__info">
                    <img src={NewIcon} alt="new icon" />
                    <div className="task__text">
                        <span className="task__title">{user.firstName}</span>
                        <span className="task__description">
                            {user.activation ? 'active' : 'deactive'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-[5px]">
                <a
                        onClick={(e) => {
                            e.preventDefault();
                            copyToClipboard();
                        }}
                        className="task__button text-[14px] p-[1px] cursor-pointer"
                    >
                        Copy Wallet
                    </a>

                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`transaction/create/${user.telegramId}`);
                        }}
                        className="task__button text-[14px] p-[0px]"
                    >
                        Transfer
                    </a>

                    
                </div>

                {showToast && (
                    <div className="absolute top-[-50px] left-0 bg-green-500 text-white text-sm py-2 px-4 rounded shadow-lg transition-opacity duration-300">
                        Wallet Address Copied! ✅
                    </div>
                )}
            </div>
        );
    }
};

export default ActiveCard;
