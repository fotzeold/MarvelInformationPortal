import { NavLink } from 'react-router-dom';

import './appHeader.scss';


const AppHeader = () => {
	const activeStyle = {
		color: "#9F0013"
	};

	return (
		<header className="app__header">
			<h1 className="app__title">
				<NavLink to="/">
					<span>Marvel</span> information portal
				</NavLink>
			</h1>
			<nav className="app__menu">
				<ul>
					<li>
						<NavLink
							style={({ isActive }) => isActive ? activeStyle : null}
							to="/"
						>
							Characters
						</NavLink>
					</li>
					/
					<li>
						<NavLink
							style={({ isActive }) => isActive ? activeStyle : null}
							to="/comics"
						>
							Comics
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader;