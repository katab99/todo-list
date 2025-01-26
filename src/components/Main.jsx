import { useState } from "react";

export default function Main() {
	const [todoList, setTodoList] = useState(["sleep", "eat"]);

	const todoListItems = todoList.map((item) => {
		return (
			<li key={item}>
				<input type="checkbox" id={item} />
				<label className="todo-item" htmlFor={item}>
					{item}
				</label>
				<button onClick={editTask}>Edit</button>
				<button onClick={deleteTask}>Delete</button>
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
				<button>Add Todo</button>
			</form>

			<section className={"todo-list"}>
				<h3>Your Todos</h3>
				<ul>{todoListItems}</ul>
			</section>
		</main>
	);
}
