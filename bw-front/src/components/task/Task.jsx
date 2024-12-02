import './Task.css';

import React from 'react';
import StarIcon from "../../assets/images/star.svg"

const Task = ({taskTitle, taskDescription, taskLink, status, action, admin, update, del}) => {

    if (!admin) {
        return (
            <div className="task">
                <div className="task__info">
                    <img src={StarIcon} alt="star"/>
                    <div className="task__text">
                        <span className="task__title">{taskTitle}</span>
                        <span className="task__description">{taskDescription}</span>
                    </div>
                </div>

                {!status ? (
                    <a
                        href={taskLink}
                        onClick={(e) => {
                            e.preventDefault();
                            action();
                        }}
                        target="_blank"
                        className="task__button"
                    >
                        Open
                    </a>
                ) : (
                    <span className="task__button">
                        Passed
                    </span>
                )}
            </div>
        );
    } else {
        return (
            <div className="task">
                <div className="task__info">
                    <img src={StarIcon} alt="star"/>
                    <div className="task__text">
                        <span className="task__title">{taskTitle}</span>
                        <span className="task__description">{taskDescription}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-[5px]">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            del();
                        }}
                        className="task__button text-[14px] p-[0px]"
                    >
                        Delete
                    </a>

                     <a
                        onClick={(e) => {
                            e.preventDefault();
                            update();
                        }}
                        className="task__button text-[14px] p-[0px]"
                    >
                        Update
                    </a>
                </div>


            </div>
        );
    }
};

export default Task;