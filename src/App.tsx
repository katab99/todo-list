import { BrowserRouter, Routes, Route } from "react-router";
import TaskList from "./components/TaskList";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NewList from "./pages/NewList";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="list/:listId" element={<TaskList />} />
					<Route path="list/new" element={<NewList />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
