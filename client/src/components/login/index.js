import React, { useState } from 'react';
import { InputGroup, Card, CardText, CardBody, Container, Row, Col, Button, Input } from 'reactstrap';
import './style.css';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Login = props => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = e => {
		setUsername(e.target.value);
	}

	const handlePasswordChange = e => {
		setPassword(e.target.value);
	}

	return (
		<div className="Login">
			 <Container>
				<Row>
					<Col sm="12" md={{ size: 6, offset: 3 }}>
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
								<Button color="primary">Login</Button>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Login;
