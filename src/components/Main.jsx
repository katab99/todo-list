import { useState } from "react";

export default function Main() {
	const [todoList, setTodoList] = useState(["sleep", "eat"]);

	const todoListItems = todoList.map((item) => {
		return (
			<li key={item} className="list-item">
				<input type="checkbox" id={item} className="checkbox" />
				<label htmlFor={item}>
					{item}
				</label>
				<button onClick={editTask} className="edit-button">Edit</button>
				<button onClick={deleteTask} className="delete-button">Delete</button>
			</li>
		);
	});

	function addTodo(formData) {
		const newTodo = formData.get("todo");
		setTodoList((prevList) => [...prevList, newTodo]);
	}

	function editTask() {
		console.log("U clicked ME!!");
	}

	function deleteTask() {
		console.log("delete this ...");
	}

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
