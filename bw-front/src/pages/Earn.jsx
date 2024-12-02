// Earn.jsx
import React from "react";
import useAppStore from "../store/app.js";
import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";
import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import Task from "../components/task/Task.jsx";
import { useNavigate } from "react-router-dom";
import useTelegram from "../hooks/telegram.js";

export default function Earn() {
    const app = useAppStore();
    const navigation = useNavigate();
    const { telegram } = useTelegram();

    async function openTask(task) {
        await app.passTask(task.id);
        if (task.link.includes('t.me')) {
            telegram.openTelegramLink(task.link);
        } else {
            telegram.openLink(task.link);
        }
        navigation("/passed");
    }

    return (
        <>
            <UIStatus
                balance={true}
                user={{
                    firstName: app.user.firstName,
                    balance: app.user.balance,
                    profileImage: app.profileImage
                }}
            />
            <UIPageIndicator page="Tasks" />
            <div className="tasks h-[300px] flex flex-col gap-[8px] mt-[15px] overflow-y-scroll">
                {app.tasks.tasks.map((task, index) => (
                    <Task
                        key={'notPassed-' + index}
                        taskTitle={task.title}
                        taskDescription={task.description}
                        taskLink={task.link}
                        status={false}
                        action={() => openTask(task)}
                    />
                ))}
                {app.tasks.passedTasks.map((task, index) => (
                    <Task
                        key={'passed-' + index}
                        taskTitle={task.title}
                        taskDescription={task.description}
                        taskLink={task.link}
                        status={true}
                        action={() => openTask(task)}
                    />
                ))}
            </div>
            <div className="btn-container">
            <button 
                onClick={() => navigation('/topreferrals')}
                className="show-btn"
            >
                Top Referrals
            </button>
            </div>
        </>

    );
}