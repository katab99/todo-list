import { useState } from "react";
import { clsx } from "clsx";
import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import { TaskProps } from "../../types";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";

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
		<div
			key={item.id}
			className={clsx("task-item-container", { taskItemEditing: isEditing })}
		>
			{isEditing ? (
				<form>
					<TextInput
						value={taskText}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTaskText(e.target.value)
						}
						onKeyDown={updateKeyDown}
					/>
					<div className="action-buttons">
						<Button onClick={submitUpdate}>Save</Button>
						<Button onClick={toggleEdit}>Cancel</Button>
					</div>
				</form>
			) : (
				<>
					<Checkbox.Root
						className="CheckboxRoot"
						id={item.id}
						checked={item.isCompleted}
						onCheckedChange={() => toggleCheck(item.id)}
					>
						<Checkbox.Indicator className="ChechboxIndicator">
							<CheckIcon />
						</Checkbox.Indicator>
					</Checkbox.Root>

					<span>{item.task}</span>

					{item.isCompleted ? null : (
						<div className="action-buttons">
							<Button onClick={toggleEdit}>Edit</Button>
							<Button onClick={deleteTask}>Delete</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
