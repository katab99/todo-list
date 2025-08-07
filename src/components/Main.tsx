import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Task from "./Task";
import { useLocalStorage } from "usehooks-ts";

export type TaskItem = {
	id: string;
	task: string;
	isCompleted: boolean;
};

type TaskList = {
	id: string;
	name: string;
	taskItems: TaskItem[];
};

export default function Main() {
	const { listId } = useParams();
	const [newTask, setNewTask] = useState("");
	const [storedLists, setStoredLists] = useLocalStorage<TaskList[]>(
		"taskLists",
		[]
	);
	const [currentList, setCurrentList] = useState<TaskList | null>(null);
	//const [currentItems, setCurrentItems] = useState<TaskItem[]>([]);

	// load current list from local storage
	useEffect(() => {
		const found = storedLists.find((list) => list.id === listId);
		if (found) setCurrentList({ ...found });
	}, [listId]);

	// auto-save current list to local storage
	useEffect(() => {
		if (!currentList) return;

		setStoredLists((prev) =>
			prev.map((list) => (list.id === currentList.id ? currentList : list))
		);
	}, [currentList, setStoredLists]);

	const todoListItems =
		currentList?.taskItems.filter((item) => item.isCompleted === false) ?? [];

	const completedListItems =
		currentList?.taskItems.filter((item) => item.isCompleted === true) ?? [];

	const addTask = () => {
		if (!currentList) return;

		const newItem: TaskItem = {
			id: crypto.randomUUID(),
			task: newTask,
			isCompleted: false,
		};

		const newTaskItems: TaskItem[] = [...currentList.taskItems, newItem];
		setCurrentList({ ...currentList, taskItems: newTaskItems });
		setNewTask("");
	};

	const updateTaskList = (updatedTask: TaskItem) => {
		if (!currentList) return;

		const updatedTaskItems = currentList.taskItems.map((task) =>
			task.id === updatedTask.id ? updatedTask : task
		);
		setCurrentList({ ...currentList, taskItems: updatedTaskItems });
	};

	const deleteTask = (id: string) => {
		if (!currentList) return;

		const keptTaskItems = currentList.taskItems.filter(
			(task) => task.id !== id
		);
		setCurrentList({ ...currentList, taskItems: keptTaskItems });
	};

	const toggleCheck = (id: string) => {
		if (!currentList) return;

		const updatedTaskItems = currentList.taskItems.map((task) =>
			task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
		);
		setCurrentList({ ...currentList, taskItems: updatedTaskItems });
	};

	const addTaskKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			addTask();
		}
	};

	return (
		<main>
			<section className="add-task-container">
				<input
					className="add-task-text"
					type="text"
					placeholder="e.g. clean up the kitchen"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					onKeyDown={addTaskKeyDown}
				/>
				<button type="submit" className="add-task-button" onClick={addTask}>
					Add
				</button>
			</section>

			{todoListItems.length > 0 ? (
				<section className="list-container">
					<p className="list-title">Your TODOs</p>
					<ul className="task-list">
						{todoListItems.map((item) => {
							return (
								<Task
									key={item.id}
									item={item}
									toggleCheck={() => toggleCheck(item.id)}
									deleteTask={() => deleteTask(item.id)}
									updateTask={updateTaskList}
								/>
							);
						})}
					</ul>
				</section>
			) : null}

			{completedListItems.length > 0 ? (
				<section className="list-container">
					<p className="list-title">Completed Tasks</p>
					<ul className="task-list">
						{completedListItems.map((item) => {
							return (
								<Task
									key={item.id}
									item={item}
									toggleCheck={() => toggleCheck(item.id)}
									deleteTask={() => deleteTask(item.id)}
									updateTask={updateTaskList}
								/>
							);
						})}
					</ul>
				</section>
			) : null}
		</main>
	);
}
