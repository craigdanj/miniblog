import React, { useState, useEffect } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './style.css';

function Post() {
	const [token, setToken] = useState(null);

	useEffect(() => {
		const t = localStorage.getItem('token');

		if(t) {
			setToken(t)
		}
	}, []);

	const handleEdit = () => {
		alert("Edit");
	}

	return (
		<div className="post">
			<Jumbotron>
				{token && <Button color="primary" onClick={handleEdit}>Edit</Button>}
				<h1 className="display-3">Hello, world!</h1>
				<p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
				<hr className="my-2" />
				<p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
				<p className="lead">
				<Button color="primary">Learn More</Button>
				</p>
			</Jumbotron>
		</div>
	);
}

export default Post;
