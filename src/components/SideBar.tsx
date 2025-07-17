import { Link } from "react-router";
import { taskLists } from "../../taskLists";

export default function SideBar() {
	return (
		<div className="sidebar-container">
			<Link to="/" className="page-title link">
				ToDo Lists
			</Link>
			<nav>
				<Link to="user" className="link">
					User
				</Link>

				{/* Map over the task lists */}
				{taskLists.map((list) => (
					<Link to={list.id} className="link">
						{list.name}
					</Link>
				))}
			</nav>
			<button>Add New List</button>
		</div>
	);
}
