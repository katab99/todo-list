import { useState } from "react";
import { Link } from "react-router";
import { Collapsible } from "radix-ui";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import NavBar from "./NavBar";

const Header = () => {
	const [open, setOpen] = useState(false);

	return (
		<header className="site-header">
			<Link to="/" className="site-title link">
				ToDo Lists
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
				<Collapsible.Content className="collapsible-content">
					<Link to="list/new" className="link">
						New list
					</Link>
					<NavBar />
				</Collapsible.Content>
			</Collapsible.Root>
		</header>
	);
};

export default Header;
