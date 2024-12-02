import React from 'react';
import { useNavigate } from 'react-router-dom';


function Passed() {
    const navigate = useNavigate();

    const goToEarnPage = () => {
        navigate('/earn');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
            <span className="dropdown__text text-white font-main text-[45px]">Task passed</span>
            <button onClick={goToEarnPage} className='show-btn'>Back to Earn</button>
        </div>
    );
}

export default Passed;
