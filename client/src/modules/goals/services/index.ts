import axiosInstance from '@/src/apis/axiosInstance';

export const getGoals = async (query?: string) => {
    const res = await axiosInstance.get(query || '/goal');
    return res.data;
};

export const getGoalById = async (id: string) => {
    const res = await axiosInstance.get(`/goal/${id}`);
    return res.data;
};

export const createGoal = async (data: any) => {
    const res = await axiosInstance.post('/goal', data);
    return res.data;
};

export const updateGoal = async (id: string, data: any) => {
    const res = await axiosInstance.put(`/goal/${id}`, data);
    return res.data;
};

export const deleteGoal = async (id: string) => {
    const res = await axiosInstance.delete(`/goal/${id}`);
    return res.data;
};

export const addToCurrentAmount = async (id: string, amount: number) => {
    const res = await axiosInstance.patch(`/goal/${id}/add-amount`, { amount });
    return res.data;
};

export const extendTargetDays = async (id: string, extraDays: number) => {
    const res = await axiosInstance.patch(`/goal/${id}/extend-days`, { extraDays });
    return res.data;
};

export const updateGoalStatus = async (id: string, status: string) => {
    const res = await axiosInstance.patch(`/goal/${id}/status`, { status });
    return res.data;
};

export const resetGoal = async (id: string) => {
    const res = await axiosInstance.patch(`/goal/${id}/reset`);
    return res.data;
};

export const getStats = async () => {
    const res = await axiosInstance.get('/goal/stats/all');
    return res.data;
};

export const getOverdueGoals = async () => {
    const res = await axiosInstance.get('/goal/filter/overdue');
    return res.data;
};

export const getUrgentGoals = async () => {
    const res = await axiosInstance.get('/goal/filter/urgent');
    return res.data;
};
