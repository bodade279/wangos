import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

const TASKS_STORAGE_KEY = '@tasks_explorer_tasks';

export const saveTasksToStorage = async (tasks: Task[]) => {
    try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Error saving tasks', e);
    }
};

export const getTasksFromStorage = async (): Promise<Task[] | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error reading tasks', e);
        return null;
    }
};
