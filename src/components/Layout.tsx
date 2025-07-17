import { Outlet } from "react-router";
import SideBar from "./Sidebar";

export default function Layout() {
	return (
		<div className="site-container">
			<SideBar />
			<Outlet />
		</div>
	);
}
