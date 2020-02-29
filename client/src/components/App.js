import React from 'react';
import './App.css';
import {
	Navbar,
	NavbarBrand,
	NavLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import Login from './login/';
import Post from './post/';
import PostList from './post-list/';


function App() {
	return (
		<div className="App">
			<Router>
				<Navbar color="light" light expand="md" sticky="top">
					<NavbarBrand href="/" className="mr-auto">
						<Link to="/">Miniblog</Link>
					</NavbarBrand>

					<NavLink href="/login">Login</NavLink>
				</Navbar>

				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/post/:id">
						<Post />
					</Route>
					<Route path="/posts/:pageNo">
						<PostList />
					</Route>
					<Route path="/">
						<PostList />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
