import { useState } from "react";
import { clsx } from "clsx";
import { TaskItem } from "./Main";

type TaskProps = {
	item: TaskItem;
	toggleCheck: (id: string) => void;
	updateTask?: (task: TaskItem) => void;
	deleteTask?: () => void;
};

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
		<li key={item.id}>
			<label
				htmlFor={item.id}
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
						<button className="task-state" onClick={() => toggleCheck(item.id)}>
							{item.isCompleted ? "✔" : " "}
						</button>
						<span className="task-name">{item.task}</span>
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
			</label>
		</li>
	);
}
