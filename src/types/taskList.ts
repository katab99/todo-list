import { TaskItem } from "../types/taskItem";

export type TaskList = {
	id: string;
	name: string;
	taskItems: TaskItem[];
};
