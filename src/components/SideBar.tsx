import { Link } from "react-router";
import { useLocalStorage } from "usehooks-ts";

// TODO : types from one source !!!
type TaskItem = {
	id: string;
	task: string;
	isCompleted: boolean;
};

type TaskList = {
	id: string;
	name: string;
	taskItems: TaskItem[];
};

export default function SideBar() {
	const [taskLists, setTaskLists] = useLocalStorage<TaskList[]>(
		"taskLists",
		[]
	);

	return (
		<div className="sidebar-container">
			<Link to="/" className="page-title">
				ToDo Lists
			</Link>
			<Link to="list/new" className="btn">
				Add New List
			</Link>
			<nav>
				{/* Map over the task lists */}
				{taskLists.map((list) => (
					<Link to={`list/${list.id}`} className="link">
						{list.name}
					</Link>
				))}
			</nav>
		</div>
	);
}
