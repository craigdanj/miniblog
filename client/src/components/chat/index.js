import React, { useState, useEffect } from 'react';
import { useMutation, useSubscription } from "@apollo/react-hooks";
import './style.css';
import gql from "graphql-tag";
import { Spinner, Card, CardBody, Container, Row, Col, Button, Input } from 'reactstrap';

function FileUpload() {
	const [token, setToken] = useState(null);
	const [text, setText] = useState('');
	const [chatList, setChatList] = useState([]);

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

	const submitChat = () => {
		if(text.length) {
			addComment({ variables: { text } });
			setText('');
		}
	};


	const COMMENTS_SUBSCRIPTION = gql`
		subscription commentAdded {
			commentAdded {
				text
			}
		}
	`;

	const { data: commentData, loading: loadingComment } = useSubscription(COMMENTS_SUBSCRIPTION, {
		onSubscriptionData: ({subscriptionData}) => {
			const newComment = subscriptionData.data.commentAdded.text;
			setChatList([...chatList, newComment ]);
			window.scrollTo(0,document.body.scrollHeight);
		}
	});

	return (
		<div className="editPost">
			<Container>
				<Row>
					<Col sm="12" md={{ size: 6, offset: 3 }}>
						{chatList.map(text => (
							<div class="chatBubble">
								{text}
						  	</div>
						))}
					</Col>
				</Row>
				<Row>
					<Col sm="12" md={{ size: 6, offset: 3 }}>
						<h3>Chat (live):</h3>
						<Card className="chatForm">
							<CardBody>
								<Input type="textarea" rows="4" name="chatText" value={text} required onChange={handleTextChange}/>
								<br/>
								<Button color="primary" onClick={submitChat}>Submit</Button>
								{loading && <Spinner type="grow" color="primary" />}
							</CardBody>

						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default FileUpload;
