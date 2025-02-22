import { useState } from "react";
import { nanoid } from "nanoid"
import Task from "./Task.jsx";

export default function Main() {
	const [taskList, setTaskList] = useState([
		{id : nanoid(), task : "sleep", isCompleted: false },
		{id: nanoid(), task : "eat", isCompleted: false },]);

	function divideTaskList(isCompletedList) {
		return taskList
			.filter((item) => item.isCompleted === isCompletedList)
			.map((item) => {
				return(<Task key={item.id}
							 item={item}
							 toggleCheck={() => toggleCheck(item.id)}
							 editTask = {editTask}
							 deleteTask = {() => deleteTask(item.id)}
							  />)
			})
	}

	const todoListItems = divideTaskList(false)
	const completedListItems = divideTaskList(true)

	function addTodo(formData) {
		const newTodo = formData.get("todo");
		setTaskList((prevList) => [...prevList, {id: nanoid(), task : newTodo, isCompleted : false}]);
	}

	function editTask() {
		console.log("U clicked ME!!");
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
			<form action={addTodo} className="add-todo-form">
				<input type="text" placeholder="e.g. sleeping" name="todo" />
				<button className={"add-button"}>Add Todo</button>
			</form>

			{todoListItems.length > 0 ? <section className="todo-list">
				<p className="list-title">Your TODOs</p>
				<ul className="list">{todoListItems}</ul>
			</section> : null}

			{ completedListItems.length > 0? <section className="todo-list">
				<p className="list-title">Completed Tasks</p>
				<ul className="list">{completedListItems}</ul>
			</section>: null}
		</main>
	);
}
