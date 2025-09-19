import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { TaskList } from "../../types";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";

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
				<TextInput
					placeholder="groceries"
					value={listName}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setListName(e.target.value)
					}
				/>
				<Button type="submit" onClick={addList}>
					Add New List
				</Button>
			</form>
		</main>
	);
}
