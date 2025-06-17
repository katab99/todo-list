import { useState } from "react";
import { nanoid } from "nanoid";
import Task from "./Task";

export type TaskType = {
	id: string;
	task: string;
	isCompleted: boolean;
};

export default function Main() {
	const [newTask, setNewTask] = useState("");
	const [taskList, setTaskList] = useState<TaskType[]>([]);

	const todoListItems = taskList.filter((item) => item.isCompleted === false);
	const completedListItems = taskList.filter(
		(item) => item.isCompleted === true
	);

	const addTask = () => {
		setTaskList((prevList) => [
			...prevList,
			{ id: nanoid(), task: newTask, isCompleted: false },
		]);
		setNewTask("");
	};

	const updateTaskList = (updatedTask: TaskType) => {
		setTaskList((prevList) =>
			prevList.map((task) => (task.id === updatedTask.id ? updatedTask : task))
		);
	};

	const deleteTask = (id: string) => {
		setTaskList((prevList) => prevList.filter((item) => item.id !== id));
	};

	const toggleCheck = (id: string) => {
		setTaskList((prevList) =>
			prevList.map((item) =>
				item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
			)
		);
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
