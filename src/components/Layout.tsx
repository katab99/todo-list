import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
	return (
		<div className="site-container">
			<Header />
			<Outlet />
		</div>
	);
}
