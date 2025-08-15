import { useState } from "react";
import { Link } from "react-router";
import { Collapsible } from "radix-ui";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import NavBar from "./NavBar";

const Header = () => {
	const [open, setOpen] = useState(false);

	return (
		<header className="site-header">
			<Link to="/" className="site-title">
				ToDo Lists
			</Link>
			<Link to="list/new" className="btn">
				Add New List
			</Link>
			<Collapsible.Root
				className="collapsible-root"
				open={open}
				onOpenChange={setOpen}
			>
				<Collapsible.Trigger asChild>
					<button className="icon-btn">
						{open ? <Cross2Icon /> : <HamburgerMenuIcon />}
					</button>
				</Collapsible.Trigger>
				<Collapsible.Content>
					<NavBar />
				</Collapsible.Content>
			</Collapsible.Root>
		</header>
	);
};

export default Header;
