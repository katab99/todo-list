import { BrowserRouter, Routes, Route } from "react-router";
import Main from "./components/Main";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NewList from "./pages/NewList";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="list/:listId" element={<Main />} />
					<Route path="list/new" element={<NewList />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
