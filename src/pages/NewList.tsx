import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { TaskList } from "../types";

export default function NewList() {
	const [taskLists, setTaskLists] = useLocalStorage<TaskList[]>(
		"taskLists",
		[]
	);

	const [listName, setListName] = useState("");

	const addList = () => {
		if (!listName.trim) return;

		const newList: TaskList = {
			id: crypto.randomUUID(),
			name: listName.trim(),
			taskItems: [],
		};

		setTaskLists((prevList) => [...prevList, newList]);
		setListName("");
	};

	return (
		<main>
			<h1 className="task-list-header">New List</h1>
			<form className="add-item-container">
				<input
					className="add-item-input"
					type="text"
					placeholder="groceries"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
				/>
				<button type="submit" className="add-item-btn btn" onClick={addList}>
					Add New List
				</button>
			</form>
		</main>
	);
}
