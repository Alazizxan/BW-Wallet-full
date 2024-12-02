import {useState, useEffect} from "react";
import {fetchTask, updateTask} from "../api/index.js";
import { useParams, useNavigate } from 'react-router-dom';


import UILoading from "../components/ui/Loading/UILoading.jsx";



export default function UpdateTask() {
   const [task, setTask] = useState({
        title: "",
        description: "",
        cost: "",
        link: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate()


    const getTask = async () => {
        const tasks = await fetchTask(params.id);
        console.log(task)
        setTask(tasks)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

     const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await updateTask(params.id, {...task, cost: Number(task.cost)});
            navigate('/admin/tasks')
        } catch (error) {
            console.error("Failed to update task:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true)
        getTask().then(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <UILoading/>
    } else {
        return (
            <>
                <h1 className="text-xl text-center mt-[10px]">Update Task</h1>
                <div className="div w-[90%] mx-auto mt-[30px] flex flex-col gap-[10px]">
                    <input
                        type="text"
                        name="title"
                        className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                        value={task.title}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                        value={task.description}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="cost"
                        className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                        value={task.cost}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="link"
                        className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                        value={task.link}
                        onChange={handleChange}
                    />

                    <button
                        className="w-[100%] bg-blue-600 h-[40px] text-white mt-[10%] rounded-sm"
                        onClick={handleUpdate}
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Task"}
                    </button>
                </div>
            </>
        );
    }
}