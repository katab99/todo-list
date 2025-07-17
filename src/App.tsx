import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Main from "./components/Main";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import User from "./pages/User";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="user" element={<User />} />
					<Route path=":listid" element={<Main />} />
				</Route>
			</Routes>
		</BrowserRouter>
		// <>
		// 	<Header />
		// 	<Main />
		// </>
	);
}
