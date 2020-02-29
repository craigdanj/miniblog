import React from 'react';
import { Media } from 'reactstrap';
import './style.css';

function PostList() {
	return (
		<div className="postList">
			<div className="postExcerpt">
				<Media>
					<Media left href="#">
						<Media object src="https://via.placeholder.com/100/09f/fff.png%20C/O%20https://placeholder.com/" alt="Generic placeholder image" />
					</Media>

					<Media body>
						<Media heading>
							<a href="/post/1">Post title</a>
						</Media>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</Media>
				</Media>
			</div>
			<div className="postExcerpt">
				<Media>
					<Media left href="#">
						<Media object src="https://via.placeholder.com/100/09f/fff.png%20C/O%20https://placeholder.com/" alt="Generic placeholder image" />
					</Media>

					<Media body>
						<Media heading>
							<a href="/post/2">Post title</a>
						</Media>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</Media>
				</Media>
			</div>
		</div>
	);
}

export default PostList;
