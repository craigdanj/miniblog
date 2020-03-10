import React, { useState } from 'react';
import { InputGroup, Card, CardText, CardBody, Container, Row, Col, Button, Input, Alert } from 'reactstrap';
import './style.css';
import { useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Redirect } from "react-router-dom";

const Login = props => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [formDirty, setFormDirty] = useState(false);

	const handleUsernameChange = e => {
		setUsername(e.target.value);
		setFormDirty(true);
	}

	const handlePasswordChange = e => {
		setPassword(e.target.value);
		setFormDirty(true);
	}

	const LOGIN = gql`
		query logUserIn($email: String!, $password: String!){
			login(email: $email, password: $password) {
				token
				userId
				userName
			}
		}
	`;

	const [login, { called, loading, data, error }] = useLazyQuery(LOGIN, {
		variables: {
			email: username,
			password: password
		}
	});

	const handleLogin = () => {
		login();
		setFormDirty(false);
	}

	if (!formDirty && !loading && data) {
		localStorage.setItem('token', data.login.token);
		localStorage.setItem('username', data.login.userName);
		props.loginComplete();
		return <Redirect to="/" />
	}

	return (
		<div className="Login">
			 <Container>
				<Row>
					<Col sm="12" md={{ size: 6, offset: 3 }}>
						{error && !formDirty && (
							<Alert color="danger" fade={false}>
								Could not login. Please ensure the username and password are correct.
							</Alert>
						)}
						<Card className="loginForm">
							<CardBody>
								<h2>Login</h2>
								<CardText>Enter your username and password to login</CardText>

								<InputGroup>
									<Input placeholder="username" className="field" value={username} onChange={handleUsernameChange} />
								</InputGroup>
								<br />
								<InputGroup>
									<Input placeholder="password" type="password" value={password} onChange={handlePasswordChange}/>
								</InputGroup>
								<br />
								<Button color="primary" onClick={handleLogin}>Login</Button>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Login;
