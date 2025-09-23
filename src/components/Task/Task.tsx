import { useState } from "react";
import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import { TaskProps } from "../../types";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import styles from "./Task.module.css";

export default function Task({
	item,
	updateTask,
	toggleCheck,
	deleteTask,
}: TaskProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [taskText, setTaskText] = useState(item.task ? item.task : "");

	const submitUpdate = () => {
		if (typeof updateTask === "function") {
			updateTask({ ...item, task: taskText });
		}
		toggleEdit();
	};

	const toggleEdit = () => {
		setIsEditing((prevInEdit) => !prevInEdit);
	};

	const updateKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			toggleEdit();
		}
	};

	return (
		<div key={item.id} className={styles.taskContainer}>
			<Checkbox.Root
				className="CheckboxRoot"
				id={item.id}
				checked={item.isCompleted}
				onCheckedChange={() => toggleCheck(item.id)}
				disabled={isEditing}
			>
				<Checkbox.Indicator className="ChechboxIndicator">
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>

			{isEditing ? (
				<form>
					<TextInput
						value={taskText}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTaskText(e.target.value)
						}
						onKeyDown={updateKeyDown}
					/>

					<Button type="submit" onClick={submitUpdate}>
						Save
					</Button>
					<Button type="button" onClick={toggleEdit}>
						Cancel
					</Button>
				</form>
			) : (
				<div>
					<span className={styles.task} onDoubleClick={toggleEdit}>
						{item.task}
					</span>

					{item.isCompleted ? null : (
						<Button onClick={deleteTask}>Delete</Button>
					)}
				</div>
			)}
		</div>
	);
}
