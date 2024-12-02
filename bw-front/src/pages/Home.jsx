import { useNavigate } from "react-router-dom";

import React from "react";
import ActiveCard from "../components/active/active.jsx";
import Profile from "../components/profile/Profile.jsx";
import useAppStore from "../store/app.js";


export default function Home() {
    const navigate = useNavigate();
    const app = useAppStore()


    const userStatus = app.statususer?.activation || false;

    const action = () => {
        navigate('/earn')
    }

    return <>
       <div className="mt-[20px]">
            <ActiveCard
                user={app.user}
                admin={false}
            />
        </div>

        <Profile profileImage={app.profileImage} user={app.user} />

         <div className="btn-container">
            <button onClick={action} className="show-btn">Show Tasks</button>
        </div>
    </>
}

