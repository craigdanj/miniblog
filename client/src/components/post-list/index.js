import React from 'react';
import { Media, Pagination, PaginationItem, PaginationLink, Spinner, Container } from 'reactstrap';
import './style.css';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_POSTS = gql`
	query {
		posts {
			id
			content
			title
		}
	}
`;

function PostList() {

	const { data, loading, error } = useQuery(GET_POSTS);
	console.log(data)
	let postList = [];

	if (loading) return (
		<Container className="themed-container">
			<Spinner type="grow" color="primary" />
		</Container>
	);
	if (error) return <p>ERROR</p>;
	if (!data) return <p>Not found</p>;
	else {
		postList = data.posts.map(post => (
			<div className="postExcerpt">
				<Media>
					<Media left href="#">
						<Media object src="https://via.placeholder.com/100/09f/fff.png%20C/O%20https://placeholder.com/" alt="Generic placeholder image" />
					</Media>

					<Media body>
						<Media heading>
							<a href="/post/1">{post.title}</a>
						</Media>
						<p>12/2/2020</p>
						{post.content}
					</Media>
				</Media>
			</div>
		));
	}

	return (
		<div className="postList">
			{postList}
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
