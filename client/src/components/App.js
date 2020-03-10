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
	let t = null;
	let user = null;

	useEffect(() => {
		t = localStorage.getItem('token');
		user = localStorage.getItem('username');

		if(t) {
			setToken(t)
			setUserName(user)
		}
	}, []);

	const handleLogin = () => {
		console.log('handleLogin called');
		t = localStorage.getItem('token');
		user = localStorage.getItem('username');
		console.log(t, user);

		if(t) {
			console.log('yes t');
			setToken(t)
			setUserName(user)
		}
	}

	return (
		<div className="App">
			<Router>
				<Navbar color="light" light expand="md" sticky="top">
					<NavbarBrand href="/" className="mr-auto">
						<Link to="/">Miniblog</Link>
					</NavbarBrand>

					{token ?
						<a>Logout {username}</a>
						:
						<NavLink href="/login">Login</NavLink>
					}
					
				</Navbar>

				<Switch>
					<Route path="/login">
						<Login loginComplete={handleLogin}/>
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
