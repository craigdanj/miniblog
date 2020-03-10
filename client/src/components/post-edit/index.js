import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import './style.css';
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { Spinner, InputGroup, Card, CardText, CardBody, Container, Row, Col, Button, Input, Alert } from 'reactstrap';

function PostEdit() {
	const [token, setToken] = useState(null);
	const { id } = useParams();

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [formDirty, setFormDirty] = useState(false);

	const handleTitleChange = e => {
		setTitle(e.target.value);
		setFormDirty(true);
	}

	const handleContentChange = e => {
		setContent(e.target.value);
		setFormDirty(true);
	}

	const GET_POST = gql`
		query getPost($id: Int){
			post(id: $id) {
				id
				title
				content
			}
		}
	`;

	const { data, loading, error } = useQuery(GET_POST, {
		variables: {
			id: parseInt(id)
		}
	});

	useEffect(() => {
		const t = localStorage.getItem('token');

		if(t) {
			setToken(t)
		}

	}, []);

	useEffect(() => {
		if(data) {
			setTitle(data.post.title);
			setContent(data.post.content);
		}

	}, [data]);


	const handleSave = () => {
		alert("saving")
	}


	console.log(data, loading, error);

	if (loading) return (
		<Container className="themed-container">
			<Spinner type="grow" color="primary" />
		</Container>
	);
	if (error) return <p>ERROR</p>;
	if (!data) return <p>No post with that id exists.</p>;

	return (
		<div className="editPost">
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
								<InputGroup>
									<Input placeholder="title" className="field" value={title} onChange={handleTitleChange} />
								</InputGroup>
								<br />
								<InputGroup>
									<Input placeholder="content" type="textarea" rows="10" value={content} onChange={handleContentChange}/>
								</InputGroup>
								<br />
								<Button color="primary" onClick={handleSave}>Save</Button>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default PostEdit;
