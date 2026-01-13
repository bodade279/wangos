export interface Task {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

export type RootStackParamList = {
    Home: undefined;
    Detail: { task: Task; toggleTaskCompletion: (id: number) => void };
};
