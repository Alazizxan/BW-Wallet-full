import {useState, useEffect} from "react";
import {deleteTask, fetchTasks} from "../api/index.js";
import { useNavigate } from "react-router-dom";

import UILoading from "../components/ui/Loading/UILoading.jsx";
import Task from '../components/task/Task.jsx'

import useAppStore from "../store/app.js";


export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const getAllTasks = async () => {
        const tasks = await fetchTasks();
        setTasks(tasks)
    }

    const del = async (taskId) => {
        setIsLoading(true)
        const task = await deleteTask(taskId)
        const tasks = await fetchTasks();

        console.log(task)

        setTasks(tasks)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        getAllTasks().then(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <UILoading/>
    } else {
        return <>
            <div className="tasks h-[450px] flex flex-col gap-[8px] mt-[15px]  p-[0px] overflow-y-scroll">
                {tasks.map((task, index) => (
                    <Task
                        key={'task-' + index}
                        taskTitle={task.title}
                        taskDescription={task.description}
                        taskLink={task.link}
                        admin={true}
                        status={false}
                        update={() => navigate(`/admin/tasks/update/${task.id}`)}
                        del={async () => await del(task.id)}
                    />
                ))}
            </div>

             <button
                className="w-[90%] mx-auto mt-[15px] mb-[5px] bg-white h-[40px] text-black rounded-[8px]"
                onClick={() => navigate(`/admin/tasks/create`)}
                disabled={isLoading}
            >
                Create Task
            </button>
        </>
    }
}