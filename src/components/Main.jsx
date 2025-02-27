import { useState } from "react";
import { nanoid } from "nanoid"
import Task from "./Task.jsx";

export default function Main() {
	const [newTask, setNewTask] = useState("");
	const [taskList, setTaskList] = useState([
		{id : nanoid(), task : "sleep", isCompleted: false},
		{id: nanoid(), task : "eat", isCompleted: false},]);

	function divideTaskList(isCompletedList) {
		return taskList
			.filter((item) => item.isCompleted === isCompletedList)
			.map((item) => {
				return(<Task key={item.id}
							 item={item}
							 toggleCheck={() => toggleCheck(item.id)}
							 deleteTask = {() => deleteTask(item.id)}
							 updateTask = {updateTaskList}
							  />)
			})
	}

	const todoListItems = divideTaskList(false)
	const completedListItems = divideTaskList(true)

	function addTask() {
		console.log(newTask);
		setTaskList((prevList) => [...prevList, {id: nanoid(), task : newTask, isCompleted : false}]);
		setNewTask("");
	}

	function updateTaskList(updatedTask) {
		setTaskList((prevList) =>
			prevList.map((task) => task.id === updatedTask.id ? updatedTask : task));
	}

	function deleteTask(id) {
		setTaskList(prevList => prevList.filter((item) => item.id !== id)
	)}

	function toggleCheck(id) {
		setTaskList(prevList =>
			(prevList.map((item) => item.id === id ? {...item, isCompleted: !item.isCompleted} : item)))
	}

	return (
		<main>
			<section className="add-task-container">
				<input className="add-task-text" type="text"
					   placeholder="e.g. sleeping" value={newTask}
					   onChange={(e) => setNewTask(e.target.value)}/>
				<button type="submit" className="add-task-button" onClick={addTask}> Add</button>
			</section>

			{todoListItems.length > 0 ? <section className="list-container">
				<p className="list-title">Your TODOs</p>
				<ul className="task-list">{todoListItems}</ul>
			</section> : null}

			{ completedListItems.length > 0? <section className="list-container">
				<p className="list-title">Completed Tasks</p>
				<ul className="task-list">{completedListItems}</ul>
			</section>: null}
		</main>
	);
}
