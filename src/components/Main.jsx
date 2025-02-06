import { useState } from "react";
import { nanoid } from "nanoid"

export default function Main() {
	const [todoList, setTodoList] = useState([
		{id : nanoid(), task : "sleep"},
		{id: nanoid(), task : "eat"},]);

	const todoListItems = todoList.map((item) => {
		return (
			<li key={item.id} className="list-item">
				<input type="checkbox" id={item.id} className="checkbox" />
				<label htmlFor={item.id}>
					{item.task}
				</label>
				<button onClick={editTask} className="edit-button">Edit</button>
				<button onClick={() => deleteTask(item.id)} className="delete-button">Delete</button>
			</li>
		);
	});

	function addTodo(formData) {
		const newTodo = formData.get("todo");
		setTodoList((prevList) => [...prevList, {id: nanoid(), task : newTodo}]);
	}

	function editTask() {
		console.log("U clicked ME!!");
	}

	function deleteTask(id) {
		setTodoList(prevList =>
			prevList.filter((item) => item.id !== id)
	)}

	return (
		<main>
			<form action={addTodo} className="add-todo-form">
				<input type="text" placeholder="e.g. sleeping" name="todo" />
				<button className={"add-button"}>Add Todo</button>
			</form>

			<section className={"todo-list"}>
				<p className="list-title">Your TODOs</p>
				<ul className="list">{todoListItems}</ul>
			</section>
		</main>
	);
}
