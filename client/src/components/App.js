import React, { useState, useEffect } from 'react';
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

	const [token, setToken] = useState(null);
	const [username, setUserName] = useState(null);

	const t = localStorage.getItem('token');
	const user = localStorage.getItem('username');

	useEffect(()=> {
		if(t) {
			setToken(t)
			setUserName(user)
		}
	}, [t, user]);

	console.log(token, username);
	

	return (
		<div className="App">
			<Router>
				<Navbar color="light" light expand="md" sticky="top">
					<NavbarBrand href="/" className="mr-auto">
						<Link to="/">Miniblog</Link>
					</NavbarBrand>

					{token ?
						<a>Logout of {username}</a>
						:
						<NavLink href="/login">Login</NavLink>
					}
					
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
