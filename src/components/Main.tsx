import { useState } from "react";
import { nanoid } from "nanoid";
import Task from "./Task.js";

type TaskType = {
	id: string;
	task: string;
	isCompleted: boolean;
};

export default function Main() {
	const [newTask, setNewTask] = useState("");
	const [taskList, setTaskList] = useState<TaskType[]>([]);

	function divideTaskList(isCompletedList: boolean) {
		return taskList
			.filter((item) => item.isCompleted === isCompletedList)
			.map((item) => {
				return (
					<Task
						key={item.id}
						item={item}
						toggleCheck={() => toggleCheck(item.id)}
						deleteTask={() => deleteTask(item.id)}
						updateTask={updateTaskList}
					/>
				);
			});
	}

	const todoListItems = divideTaskList(false);
	const completedListItems = divideTaskList(true);

	function addTask() {
		setTaskList((prevList) => [
			...prevList,
			{ id: nanoid(), task: newTask, isCompleted: false },
		]);
		setNewTask("");
	}

	function updateTaskList(updatedTask: TaskType) {
		setTaskList((prevList) =>
			prevList.map((task) => (task.id === updatedTask.id ? updatedTask : task))
		);
	}

	function deleteTask(id: string) {
		setTaskList((prevList) => prevList.filter((item) => item.id !== id));
	}

	function toggleCheck(id: string) {
		setTaskList((prevList) =>
			prevList.map((item) =>
				item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
			)
		);
	}

	function addTaskKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			addTask();
		}
	}

	return (
		<main>
			<section className="add-task-container">
				<input
					className="add-task-text"
					type="text"
					placeholder="e.g. sleeping"
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
					<ul className="task-list">{todoListItems}</ul>
				</section>
			) : null}

			{completedListItems.length > 0 ? (
				<section className="list-container">
					<p className="list-title">Completed Tasks</p>
					<ul className="task-list">{completedListItems}</ul>
				</section>
			) : null}
		</main>
	);
}
