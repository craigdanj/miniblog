import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './style.css';

function Post() {
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

	return (
		<div className="post">
			<Jumbotron>
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
