import { Outlet } from "react-router";
import SideBar from "./SideBar";

export default function Layout() {
	return (
		<div className="site-container">
			<SideBar />
			<Outlet />
		</div>
	);
}
