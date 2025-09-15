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
			<section className="add-task-container">
				<input
					className="add-task-text"
					type="text"
					placeholder="groceries"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
				/>
				<button type="submit" className="add-task-button" onClick={addList}>
					Add new list
				</button>
			</section>
		</main>
	);
}
