import React, { useState, useEffect } from 'react';
import './App.css';
import {
	Navbar,
	NavbarBrand,
	NavLink,
	NavItem,
	Nav,
	Button
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
import PostEdit from './post-edit/';
import FileUpload from './file-upload/';
import Chat from './chat/';


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
		t = localStorage.getItem('token');
		user = localStorage.getItem('username');

		if(t) {
			setToken(t);
			setUserName(user);
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');

		setToken(null);
		setUserName(null);
	}

	return (
		<div className="App">
			<Router>
				<Navbar color="light" light expand="md" sticky="top">
					<NavbarBrand href="/" className="mr-auto">
						<Link to="/">Miniblog</Link>
					</NavbarBrand>

					<Nav className="mr-auto" navbar>
						<NavItem>
							<Link to="/chat">Chat</Link>
						</NavItem>
						&nbsp; / &nbsp;
						<NavItem>
							<Link to="/file-upload">File Upload</Link>
						</NavItem>
					</Nav>


					{token ?
						<Button onClick={handleLogout}>Logout {username}</Button>
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
					<Route path="/postedit/:id">
						<PostEdit />
					</Route>
					<Route path="/posts/:pageNo">
						<PostList />
					</Route>
					<Route path="/file-upload">
						<FileUpload />
					</Route>
					<Route path="/chat">
						<Chat />
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
