import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Task from "./Task";
import { useLocalStorage } from "usehooks-ts";
import { TaskItem, TaskList } from "../types";

export default function TaskList() {
	const { listId } = useParams();
	const [newTask, setNewTask] = useState("");
	const [storedLists, setStoredLists] = useLocalStorage<TaskList[]>(
		"taskLists",
		[]
	);
	const [currentList, setCurrentList] = useState<TaskList | null>(null);

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

	return (
		<main className="task-list-container">
			<div className="task-list-header">
				<h1>{currentList && currentList.name}</h1>
			</div>

			<form className="add-item-container">
				<input
					className="add-item-input"
					type="text"
					placeholder="e.g. clean up the kitchen"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>

				<button type="submit" className="add-item-btn btn" onClick={addTask}>
					Add Task
				</button>
			</form>

			{todoListItems.length > 0 ? (
				<section>
					<h3>todo</h3>
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
				</section>
			) : null}

			{completedListItems.length > 0 ? (
				<section>
					<h3>done</h3>
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
				</section>
			) : null}
		</main>
	);
}
