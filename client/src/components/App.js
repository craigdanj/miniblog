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
import Login from './login/';
import Post from './post/';
import PostList from './post-list/';

function App() {
	return (
		<div className="App">
			<Navbar color="light" light expand="md" sticky="top">
				<NavbarBrand href="/">Miniblog</NavbarBrand>

				<Nav className="mr-auto" navbar>
					<NavItem>
						<NavLink href="/profile">Profile</NavLink>
					</NavItem>
				</Nav>

				<NavLink href="/login">Login</NavLink>
			</Navbar>

			<Login />
			<PostList />
			<Post />


		</div>
	);
}

export default App;
