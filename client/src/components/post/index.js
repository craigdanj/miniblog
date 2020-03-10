import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { Jumbotron, Button, Container, Spinner } from 'reactstrap';
import './style.css';
import gql from "graphql-tag";
import { useParams, useHistory } from "react-router-dom";

function Post() {
	const [token, setToken] = useState(null);
	const { id } = useParams();
	const history = useHistory();

	useEffect(() => {
		const t = localStorage.getItem('token');

		if(t) {
			setToken(t);
		}
	}, []);

	const handleEdit = () => {
		history.push(`/postedit/${id}`);
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

	console.log(data, loading, error);

	if (loading) return (
		<Container className="themed-container">
			<Spinner type="grow" color="primary" />
		</Container>
	);
	if (error) return <p>ERROR</p>;
	if (!data) return <p>No post with that id exists.</p>;

	return (
		<div className="post">
			<Jumbotron>
				{token && <Button color="primary" onClick={handleEdit}>Edit</Button>}
				<h1 className="display-3">{data.post.title}</h1>
				<hr className="my-2" />
				<div className="lead">
					{data.post.content}
				</div>
			</Jumbotron>
		</div>
	);
}

export default Post;
