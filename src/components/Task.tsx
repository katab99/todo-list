import { useState } from "react";
import { clsx } from "clsx";
import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import { TaskProps } from "../types";

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
		if (e.key === "Enter") {
			submitUpdate();
		}
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
				<>
					<input
						className="task-update"
						type="text"
						value={taskText}
						onChange={(e) => setTaskText(e.target.value)}
						onKeyDown={updateKeyDown}
					/>
					<div className="action-buttons">
						<button type="submit" className="btn" onClick={submitUpdate}>
							Save
						</button>
						<button type="button" className="btn" onClick={toggleEdit}>
							Cancel
						</button>
					</div>
				</>
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
							<button onClick={toggleEdit} className="btn">
								Edit
							</button>
							<button onClick={deleteTask} className="btn">
								Delete
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
