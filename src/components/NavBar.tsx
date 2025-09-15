import { ReactNode } from "react";
import { Link } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import { NavigationMenu } from "radix-ui";
import { TaskList } from "../types";

type CustomLinkProps = {
	href: string;
	children: ReactNode;
};

function CustomLink({ href, children }: CustomLinkProps) {
	return (
		<NavigationMenu.Link asChild>
			<Link to={href} className="link task-list-link">
				{children}
			</Link>
		</NavigationMenu.Link>
	);
}

export default function NavBar() {
	const [taskLists, setTaskLists] = useLocalStorage<TaskList[]>(
		"taskLists",
		[]
	);

	return (
		<>
			<NavigationMenu.Root>
				{taskLists.length > 0 ? (
					<NavigationMenu.List className="nav-menu-list">
						<NavigationMenu.Item className="nav-menu-item">
							<NavigationMenu.Trigger className="nav-menu-trigger link">
								Task Lists
							</NavigationMenu.Trigger>

							<NavigationMenu.Content className="nav-menu-content">
								{taskLists.map((list) => (
									<CustomLink href={`list/${list.id}`}>{list.name}</CustomLink>
								))}
							</NavigationMenu.Content>
						</NavigationMenu.Item>
					</NavigationMenu.List>
				) : (
					""
				)}
			</NavigationMenu.Root>
		</>
	);
}
