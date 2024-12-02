import axios from 'axios';
import useTelegram from "../hooks/telegram.js";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL+'api',
    timeout: 5000,
})


export const fetchUserTasks = async (telegramId) => {
    const response = await api.get(`/tasks/all/${telegramId}`);
    return response.data.data;
}

export const fetchUserDetails = async (telegramId) => {
    const response = await api.get(`/user/details/${telegramId}`);
    return response.data.data;
}

export const fetchTopRef = async () => {
    const response = await api.get('/top-referrals');
    return response.data.data;
}

export const fetchAllUsers = async () => {
    const response = await api.get('/alluseradm');
    return response.data.data;
}

export const fetchTasks = async () => {
    const response = await api.get(`/tasks/all/`);
    return response.data.data;
}

export const fetchCountdown = async () => {
    const response = await api.get(`/countdown/get`);
    return response.data.data;
}

export const updateCountdown = async (data) => {
    const response = await api.post(`/countdown/update`, data);
    return response.data.data;
}

export const fetchUsersCount = async () => {
    const response = await api.get(`/users/count`);
    return response.data.data;
}

export const updateTask = async (taskId, data) => {
    const response = await api.post(`/tasks/update/${taskId}`, data);
    return response.data.data;
}

export const fetchTask = async (taskId) => {
    const response = await api.get(`/tasks/get/${taskId}`)
    return response.data.data;
}

export const deleteTask = async (taskId) => {
    const response = await api.get(`/tasks/delete/${taskId}`)
    return response.data.data;
}

export const createTask = async (taskData) => {
    const response = await api.post(`/tasks/create`, taskData);
    return response.data.data;
}

export const compleateTask = async (taskId, telegramId) => {
    const response = await api.post(`/tasks/pass/`, {telegramId, taskId})
    return response.data.data;
}

export const createTransaction = async (transactionData) => {
    const response = await api.post('transactions/create', transactionData)
    return response.data.data;
}

export const getWallet = async (userId) => {
    try {
        const response = await api.get(`/wallet/get/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching wallet:', error);
        return null;
    }
}

export const connectWallet = async (userId, walletAddress) => {
    const response = await api.post(`/wallet/create/`, {
        userId: userId,
        walletAddress: walletAddress
    });

    return response.data.data;
}

export const disconnectWallet = async (userId) => {
    await api.delete(`/wallet/delete/${userId}`);
    return true;
}

export const getStatus = async () => {
    const response = await api.get('/countdown/get')
    return response.data.data.status;
}

export const updateStatus = async (status) => {
    const response = await api.post('/countdown/update', { status: status });
    return response.data.data;
}

export const fetchFriends = async (referallId) => {
    const response = await api.get(`/users/friends/${referallId}`);
    return response.data.data;
}

export const fetchAllTrasactions = async () => {
    const response = await api.get(`/transactions/all`)
    return response.data.data;
}

export const fetchUserTransactions = async (telegramId) => {
    const response = await api.get(`/transactions/user/${telegramId}`);
    return response.data.data;
}

export const activateUser = async (telegramId) => {
    const response = await api.post(`/user/activation/${telegramId}`);
    return response.data.data;
}

export const register = async () => {
    const {user, referall } = useTelegram()


    const response = await api.post(`/users/register`, {
        firstName: user.first_name,
        telegramId: user.id,
        profileImage: user.photo_url,
        referall: referall,
    });

    return response.data.data;
}