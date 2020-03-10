import React from 'react';
import { Media, Pagination, PaginationItem, PaginationLink, Spinner, Container } from 'reactstrap';
import './style.css';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
	useParams
} from "react-router-dom";

const PostList = props => {
	const { pageNo } = useParams();

	const GET_POSTS = gql`
		query {
			posts(page: ${pageNo || 1}) {
				total
				posts {
					id
					title
					content
				}
			}
		}
	`;
	const { data, loading, error } = useQuery(GET_POSTS);
	const totalPostCount = data && data.posts && data.posts.total;
	let postList = [];
	let paginationList = [];

	if (loading) return (
		<Container className="themed-container">
			<Spinner type="grow" color="primary" />
		</Container>
	);
	if (error) return <p>ERROR</p>;
	if (!data) return <p>No posts written yet.</p>;

	else {
		postList = data.posts.posts.map(post => (
			<div className="postExcerpt" key={post.id}>
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

		const fullPages = parseInt(totalPostCount / 10);
		const pageCount = totalPostCount % 10 ? (fullPages + 1): fullPages;

		let i = 0;
		for (i = 0; i < pageCount; i++) {
			paginationList.push((
				<PaginationItem key={i}>
					<PaginationLink href={`/posts/${i+1}`}>
						{i+1}
					</PaginationLink>
				</PaginationItem>
			));
		}
	}

	return (
		<div className="postList">
			{postList}
			<div className="paginationContainer d-flex justify-content-center">
				<Pagination aria-label="Page navigation example">
					{/* <PaginationItem>
						<PaginationLink first href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink previous href="#" />
					</PaginationItem> */}

					{paginationList}
					{/* <PaginationItem>
						<PaginationLink next href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink last href="#" />
					</PaginationItem> */}
				</Pagination>
			</div>
		</div>
	);
};

export default PostList;
