import React from 'react';
import './App.css';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Post from './post/';

function App() {
	return (
		<div className="App">
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">Miniblog</NavbarBrand>

				<Nav className="mr-auto" navbar>
					<NavItem>
						<NavLink href="/profile">Profile</NavLink>
					</NavItem>
				</Nav>

				<NavLink href="/login">Login</NavLink>
			</Navbar>

			<Post />
		</div>
	);
}

export default App;
