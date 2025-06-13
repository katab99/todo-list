/* eslint-disable */
import { useState } from "react";
import { clsx } from "clsx";

type TaskType = {
	id: string;
	task: string;
	isCompleted: boolean;
};

type TaskProps = {
	item: TaskType;
	updateTask: (task: TaskType) => void;
	toggleCheck: (id: string) => void;
	deleteTask: () => void;
};

export default function Task(props: TaskProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [taskText, setTaskText] = useState(
		props.item.task ? props.item.task : ""
	);

	function submitUpdate() {
		props.updateTask({ ...props.item, task: taskText });
		toggleEdit();
	}

	function toggleEdit() {
		setIsEditing((prevInEdit) => !prevInEdit);
	}

	function updateKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			submitUpdate();
		}
		if (e.key === "Escape") {
			toggleEdit();
		}
	}

	return (
		<li key={props.item.id}>
			<label
				htmlFor={props.item.id}
				className={clsx("task-item", { editing: isEditing })}
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
							<button type="submit" onClick={submitUpdate}>
								Save
							</button>
							<button type="button" onClick={toggleEdit}>
								Cancel
							</button>
						</div>
					</>
				) : (
					<>
						<button
							className="task-state"
							onClick={() => props.toggleCheck(props.item.id)}
						>
							{props.item.isCompleted ? "✔" : " "}
						</button>
						<span className="task-name">{props.item.task}</span>
						{props.item.isCompleted ? null : (
							<div className="action-buttons">
								<button onClick={toggleEdit} className="edit-button">
									Edit
								</button>
								<button onClick={props.deleteTask} className="delete-button">
									Delete
								</button>
							</div>
						)}
					</>
				)}
			</label>
		</li>
	);
}
