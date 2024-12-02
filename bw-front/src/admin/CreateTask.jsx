import {useState} from "react";
import {createTask} from "../api/index.js";
import {useNavigate} from 'react-router-dom';


export function CreateTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [task, setTask] = useState({
        title: "",
        description: "Compleate task for rewards",
        cost: Number(""),
        link: ""
    });

    const navigate = useNavigate()


    const handleCreate = async () => {
        setIsLoading(true);
        await createTask(task);
        setIsLoading(false);
        navigate('/admin/tasks');
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    return <>
        <h1 className="text-xl text-center mt-[10px]">Update Task</h1>
        <div className="div w-[90%] mx-auto mt-[30px] flex flex-col gap-[10px]">
            <input
                type="text"
                name="title"
                className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                value={task.title}
                placeholder="Enter task title"
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                value={task.description}
                placeholder="Enter task description"
                onChange={handleChange}
            />
            <input
                type="text"
                name="cost"
                className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                value={task.cost}
                placeholder="Enter task cost"
                onChange={handleChange}
            />
            <input
                type="text"
                name="link"
                className="input w-[100%] h-[40px] px-[5px] text-xl font-monospace font-normal text-black rounded-sm"
                value={task.link}
                placeholder="Enter task link"
                onChange={handleChange}
            />

            <button
                className="w-[100%] bg-blue-600 h-[40px] text-white rounded-sm"
                onClick={handleCreate}
                disabled={isLoading}
            >
                {isLoading ? "Creating..." : "Create Task"}
            </button>
        </div>
    </>
}