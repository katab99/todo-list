import { useState } from "react";

type TaskItem = {
	id: string;
	task: string;
	isCompleted: boolean;
};
type TaskList = {
	id: string;
	name: string;
	taskList: TaskItem[];
};

export default function NewList() {
	const [listName, setListName] = useState("");

	const addList = () => {
		// TODO : cannot sumbit without giving any name
		// TODO: redirect to new List in the end

		const listsString = localStorage.getItem("taskLists") ?? "";
		const listsArray = JSON.parse(listsString || "[]");

		const newList: TaskList = {
			id: crypto.randomUUID(),
			name: listName,
			taskList: [],
		};

		localStorage.setItem("taskLists", JSON.stringify([...listsArray, newList]));
		setListName("");
	};

	// TODO : refactor, DRY !!!
	// this text submit form also in Main.tsx
	// also .css
	return (
		<main>
			<section className="add-task-container">
				<input
					className="add-task-text"
					type="text"
					placeholder="groceries"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					// TODO : onKeyDown
				/>
				<button type="submit" className="add-task-button" onClick={addList}>
					Add new list
				</button>
			</section>
		</main>
	);
}
