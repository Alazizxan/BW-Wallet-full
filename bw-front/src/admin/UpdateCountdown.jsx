import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';


import UILoading from "../components/ui/Loading/UILoading.jsx";
import {fetchCountdown, updateCountdown} from "../api/index.js";
import {DHMSToTimestamp, timestampToDHMS} from "../utils/time.js";

export default function UpdateCountdown() {

    const [countdown, setCountdown] = useState({
        days: "",
        hours: "",
        minutes: "",
        status: null
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const getCountdwon = async () => {
        setLoading(true);
        const countdown = await fetchCountdown()
        const date = timestampToDHMS(countdown.date)
        const data = {
            days: Number(date.days),
            hours: Number(date.hours),
            minutes: Number(date.minutes),
            status: countdown.status
        }
        setCountdown(data)
        console.log(data)
    }

    useEffect(() => {
        getCountdwon().then(() => setLoading(false));
    }, [])


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCountdown((prevCountdown) => ({
            ...prevCountdown,
            [name]: type === "checkbox" ? checked : value,
        }));
        console.log(countdown);
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const date = new Date(DHMSToTimestamp(Number(countdown.days), Number(countdown.hours), Number(countdown.minutes))).toISOString()

            console.log(date)

            await updateCountdown({
                status: countdown.status,
                date: date
            });
            console.log('ss' ,)
            navigate('/admin/countdown')
        } catch (error) {
            console.error("Failed to update task:", error);
        }
        setLoading(false);
    };

    return <>
        <div className="countdown">
            {
                loading ? <UILoading/> :
                    <div>
                        <h1 className="text-xl text-center mt-[10px]">Update Task</h1>

                        <div className="inputs w-[90%] mx-auto mt-[30px] flex flex-col gap-[10px]">
                            <input
                                type="number"
                                name="days"
                                className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                                value={countdown.days}
                                placeholder="Enter countdown days"
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="hours"
                                className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                                value={countdown.hours}
                                placeholder="Enter countdown hours"
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="minutes"
                                className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                                value={countdown.minutes}
                                placeholder="Enter countdown minutes"
                                onChange={handleChange}
                            />
                            <div className="flex items-center gap-[10px]">
                                <label className="text-xl font-monospace">Status:</label>
                                <input
                                    type="checkbox"
                                    name="status"
                                    checked={countdown.status}
                                    onChange={handleChange}
                                />
                                <span>{countdown.status ? "Active" : "Inactive"}</span>
                            </div>

                            <button
                                className="w-[100%] bg-blue-600 h-[40px] mt-[20px] text-white rounded-sm"
                                onClick={handleUpdate}
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update Countdown"}
                            </button>
                        </div>


                    </div>
            }
        </div>

    </>
}