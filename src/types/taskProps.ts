import { TaskItem } from "./taskItem";

export type TaskProps = {
	item: TaskItem;
	toggleCheck: (id: string) => void;
	updateTask?: (task: TaskItem) => void;
	deleteTask?: () => void;
};
