import React, {useEffect, useState} from "react";
import {fetchUsersCount} from "../api/index.js";

import UILoading from "../components/ui/Loading/UILoading.jsx";

export default function Statistic() {
    const [count, setCount] = useState(1000);
    const [loading, setLoading] = useState(false);

    const fetchCount = async () => {
        setLoading(true);
        const data = await fetchUsersCount()
        setCount(data),
        setLoading(false)
    }

    useEffect(() => {
        fetchCount();
    }, []);

    return <> 
        <div className="statistic">
            {
                loading ? <UILoading/> : <div className="count flex flex-col items-center justify-center mt-[50px]">
                <span className="count-title text-xl">Total users: </span>
                <span className={'text-[50px]'}>{count}</span>
            </div>
            }
        </div>
        </>
}
