import './Navigation.css';

import {Link, useLocation} from "react-router-dom";
import HomeIcon from "../icons/HomeIcon.jsx";
import {useEffect, useState} from "react";
import EarnIcon from "../icons/EarnIcon.jsx";
import FriendIcon from "../icons/FriendIcon.jsx";
import WalletIcon from "../icons/WalletIcon.jsx";

export default function Navigation() {
    const [page, setPage] = useState("");
    const location = useLocation();


    useEffect(() => {
        setPage(location.pathname);
    }, [location.pathname]);

    return (
        <div className="navigation ">
            <Link to={'/'}>
                <div className={`navigation-item ${page === "/" ? 'active' : ''}`}>
                    <HomeIcon active={page === "/"}/>
                    <span>Home</span>
                </div>
            </Link>
            <Link to={'/earn'}>
                <div className={`navigation-item ${page === "/earn" ? 'active' : ''}`}>
                    <EarnIcon active={page === "/earn"}/>
                    <span>Earn</span>
                </div>
            </Link>
            <Link to={'/friends'}>
                <div className={`navigation-item ${page === "/friends" ? 'active' : ''}`}>
                    <FriendIcon active={page === "/friends"}/>
                    <span>Friends</span>
                </div>
            </Link>
            <Link to={'/wallet'}>
                <div className={`navigation-item ${page === "/wallet" ? 'active' : ''}`}>
                    <WalletIcon active={page === "/wallet"}/>
                    <span>Wallet</span>
                </div>
            </Link>
        </div>
    )
}