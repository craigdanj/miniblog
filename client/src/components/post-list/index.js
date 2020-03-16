import React from 'react';
import { Media, Pagination, PaginationItem, PaginationLink, Spinner, Container } from 'reactstrap';
import './style.css';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";

const PostList = () => {
	const { pageNo } = useParams();

	const GET_POSTS = gql`
		query getPosts($page: Int){
			posts(page: $page) {
				total
				posts {
					id
					title
					content
				}
			}
		}
	`;

	const { data, loading, error } = useQuery(GET_POSTS, {
		variables: {
			page: parseInt(pageNo) || 1
		}
	});
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
					<Media body>
						<Media heading>
							<a href={`/post/${post.id}`}>{post.title}</a>
						</Media>
						<p>
							{post.content}
						</p>
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
