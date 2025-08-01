import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Task from "./Task";
import { taskLists } from "../../taskLists";

export type TaskItem = {
	id: string;
	task: string;
	isCompleted: boolean;
};

export default function Main() {
	const { listid } = useParams();
	const [newTask, setNewTask] = useState("");
	const [taskList, setTaskList] = useState<TaskItem[]>([]);

	// TODO : implement localStorage

	// TODO : rethink this part
	// get the task list from "database"
	// [listid] - so when the route changes, the displayed list also changes
	useEffect(() => {
		taskLists
			.filter((list) => list.id == listid)
			.map((item) => setTaskList(item.taskList));
	}, [listid]);

	const todoListItems = taskList.filter((item) => item.isCompleted === false);
	const completedListItems = taskList.filter(
		(item) => item.isCompleted === true
	);

	const addTask = () => {
		setTaskList((prevList) => [
			...prevList,
			{ id: crypto.randomUUID(), task: newTask, isCompleted: false },
		]);
		setNewTask("");
	};

	const updateTaskList = (updatedTask: TaskItem) => {
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
