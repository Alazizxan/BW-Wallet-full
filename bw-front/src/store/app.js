import {create} from 'zustand';
import {compleateTask, fetchCountdown, fetchFriends, fetchTopRef, fetchUserDetails, fetchUserTasks, getStatus, register} from "../api/index.js";

import getFileLink from "../utils/file.js";


const useAppStore = create((set) => ({
    user: {},
    tasks: {},
    friends: [],
    profileImage: {},
    status: null,
    topfer: {},
    statususer: {},


    init: async (referall) => {
        const countdown = await fetchCountdown()
        const user = await register(referall)
        const friends = await fetchFriends(user.telegramId);
        const tasks = await fetchUserTasks(user.telegramId);
        const profileImage = await getFileLink(user.profileImage);
        const status = countdown.status;
        const topfer = await fetchTopRef();
        const statususer = await fetchUserDetails(user.telegramId);

        set({user, profileImage, status, friends, topfer, tasks,statususer});
    },

    passTask: async (taskId) => {
        set(async (state) => {
            await compleateTask(taskId, state.user.telegramId);
            const user = await register(state.user.telegramId);

            fetchUserTasks(state.user.telegramId).then(async (updatedTasks) => {
                set({ user: user})
                set({tasks: updatedTasks});
            });

            return {tasks: state.tasks, user: state.user};
        });
    }
}));


export default useAppStore;