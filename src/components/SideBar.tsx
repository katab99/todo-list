import { Link } from "react-router";
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
	const localStorageString = localStorage.getItem("taskLists") ?? "";
	const localStorageArray: TaskList[] = JSON.parse(localStorageString || "[]");

	return (
		<div className="sidebar-container">
			<Link to="/" className="page-title link">
				ToDo Lists
			</Link>
			<nav>
				<Link to="list/new">Add New List</Link>
				{/* Map over the task lists */}
				{localStorageArray.map((list) => (
					<Link to={`list/${list.id}`} className="link">
						{list.name}
					</Link>
				))}
			</nav>
		</div>
	);
}
