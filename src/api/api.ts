import { Task } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
