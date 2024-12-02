import "./Wrapper.css";
import {Outlet} from "react-router-dom";
import Navigation from "../components/navigation/Navigation.jsx";


export default function Wrapper() {
    return <>
        <div className="wrapper">
            <div className="content">
                <Outlet />
            </div>
            <Navigation />
        </div>
    </>
}