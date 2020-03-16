import React, { useState, useEffect } from 'react';
import { useMutation } from "@apollo/react-hooks";
import './style.css';
import gql from "graphql-tag";
import { Spinner, Card, CardBody, Container, Row, Col, Button, Input } from 'reactstrap';

function FileUpload() {
	const [token, setToken] = useState(null);
	const [text, setText] = useState('');

	const handleTextChange = e => {
		setText(e.target.value);
	}

	useEffect(() => {
		const t = localStorage.getItem('token');

		if(t) {
			setToken(t)
		}

	}, []);

	const ADD_COMMENT = gql`
		mutation addComment($text: String!) {
			addComment(text: $text)
		}
	`;

	const [
		addComment,
		{ data, loading, error }
	] = useMutation(ADD_COMMENT);

	const submitChat = () => addComment({ variables: { text } });

	return (
		<div className="editPost">
			<Container>
				<Row>
					<Col sm="12" md={{ size: 6, offset: 3 }}>
						<h3>Chat:</h3>
						<Card className="chatForm">
							<CardBody>
								<Input type="textarea" name="chatText" required onChange={handleTextChange}/>
								<br/>
								<Button color="primary" onClick={submitChat}>Submit</Button>
								{loading && <Spinner type="grow" color="primary" />}
							</CardBody>
							{data && data.addComment}
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default FileUpload;
