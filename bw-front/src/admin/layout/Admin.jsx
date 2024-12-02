import './Admin.css';
import {NavLink, Outlet, useLocation} from "react-router-dom";

export default function Admin() {
    const location = useLocation();

    return (
        <>
            <div className="admin">
                <div className="content">
                    <Outlet />
                </div>
                <div className="buttons">
                    {/* Agar hozirgi sahifa /admin/tasks bo'lsa faqat back tugmasini ko'rsatamiz */}
                    {location.pathname === '/admin' ? (
                        <>
                        <NavLink to={"/admin"}><button>Statistic</button></NavLink>
                        <NavLink to={"/admin/countdown"}><button>Countdown</button></NavLink>
                        <NavLink to={"/admin/tasks"}><button>Tasks</button></NavLink>
                        <NavLink to={"/Alluser"}><button>All User</button></NavLink>
                        <NavLink to={"active/transaction/all"}><button>All Transaction</button></NavLink>
                    </>
                        
                    ) : (
                        // Aks holda barcha tugmalarni ko'rsatamiz
                        <NavLink to={"/admin"}>
                            <button>Back</button>
                        </NavLink>
                    )}
                </div>
            </div>
        </>
    );
}
