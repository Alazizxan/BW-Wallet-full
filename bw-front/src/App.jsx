import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";


import Home from "./pages/Home.jsx";
import Earn from "./pages/Earn.jsx";
import Friends from "./pages/Friends.jsx";
import Wallet from "./pages/Wallet.jsx";
import Wrapper from "./wrapper/Wrapper.jsx";
import Passed from "./pages/Passed.jsx";
import UILoading from "./components/ui/Loading/UILoading.jsx";
import AllUserAdmn from "./pages/Alluser-admn.jsx";
import MyTransactionHistory from "./pages/user-transaction.jsx"

import useAppStore from "./store/app.js";

import TopReferrals from "./pages/Topref.jsx"

import Statistic from "./admin/Statistic.jsx";
import CreateTransaction from "./admin/create-transaction.jsx";
import Tasks from "./admin/Tasks.jsx";
import UpdateTask from './admin/UpdateTask.jsx'
import Active from './admin/active.jsx';
import Admin from "./admin/layout/Admin.jsx";
import {CreateTask} from "./admin/CreateTask.jsx";
import UpdateCountdown from "./admin/UpdateCountdown.jsx";
import TransactionHistory from "./admin/transaction-history.jsx";

function App() {
    const app = useAppStore()
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function initializeApp() {
            await app.init();
            setLoading(false);
        }

        initializeApp()
    }, [app.init])


    return (
        loading ? <UILoading/> :
            <Routes>
                <Route path="/" element={<Wrapper/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/earn" element={<Earn/>}/>
                    <Route path="/friends" element={<Friends/>}/>
                    <Route path="/wallet" element={<Wallet/>}/>
                    <Route path='/topreferrals' element={<TopReferrals/>}/>
                    <Route path='/myprize' element={<MyTransactionHistory/>}/>
                </Route>

                <Route path="/passed" element={<Passed/>}/>

                <Route path='/admin' element={<Admin/>}>
                    <Route index element={<Statistic/>}/>
                    <Route path='active' element={<Active/>}/>
                    <Route path='tasks' element={<Tasks/>}/>
                    <Route path='tasks/update/:id' element={<UpdateTask/>}/>
                    <Route path='tasks/create/' element={<CreateTask/>}/>
                    <Route path='countdown/' element={<UpdateCountdown/>}/>
                    <Route path="active/transaction/create/:telegramId" element={<CreateTransaction />} />
                    <Route path="active/transaction/all" element={<TransactionHistory />}/>
                </Route>
                <Route path='Alluser/' element={<AllUserAdmn/>}/> //this is a new

            </Routes>
    )

}

export default App
