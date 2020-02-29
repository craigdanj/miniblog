import React from 'react';
import { Media, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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
						<p>12/2/2020</p>
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
						<p>12/2/2020</p>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</Media>
				</Media>
			</div>

			<div className="paginationContainer d-flex justify-content-center">
				<Pagination aria-label="Page navigation example">
					<PaginationItem>
						<PaginationLink first href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink previous href="#" />
					</PaginationItem>

					<PaginationItem>
						<PaginationLink href="/posts/1">
							1
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="/posts/2">
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">
							3
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">
							4
						</PaginationLink>
					</PaginationItem>

					<PaginationItem>
						<PaginationLink next href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink last href="#" />
					</PaginationItem>
				</Pagination>
			</div>
		</div>
	);
}

export default PostList;
