import React from 'react';
import { InputGroup, Card, CardText, CardBody, Container, Row, Col, Button, Input } from 'reactstrap';
import './style.css';

function Login() {
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
									<Input placeholder="username" className="field" />
								</InputGroup>
								<br />
								<InputGroup>
									<Input placeholder="password" type="password" />
								</InputGroup>
								<br />
								<Button>Login</Button>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Login;
