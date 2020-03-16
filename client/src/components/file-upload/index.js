import React, { useState, useEffect } from 'react';
import { useMutation } from "@apollo/react-hooks";
import './style.css';
import gql from "graphql-tag";
// import { useParams } from "react-router-dom";
import { Spinner, Card, CardBody, Container, Row, Col, Button, Alert } from 'reactstrap';

function FileUpload() {
	const [token, setToken] = useState(null);
	const [formDirty, setFormDirty] = useState(false);
	const [file, setFile] = useState(null);

	useEffect(() => {
		const t = localStorage.getItem('token');

		if(t) {
			setToken(t)
		}

	}, []);

	const UPLOAD_FILE = gql`
		mutation singleUpload($file: Upload!) {
			singleUpload(file: $file) {
				filename
			}
		}
	`;

	const [
		uploadFile,
		{ data, loading: uploadInProgress, error: error }
	] = useMutation(UPLOAD_FILE, {
		variables: {
			file
		}
	});

	const handleFileChange = e => {
		console.log(e.target.files[0]);
		setFile(e.target.value);
		setFormDirty(true);
	}

	const handleUpload = () => {
		uploadFile();
		setFormDirty(false);
	}

	// if (loading) return (
	// 	<Container className="themed-container">
	// 		<Spinner type="grow" color="primary" />
	// 	</Container>
	// );
	// if (error) return <p>ERROR</p>;

	return (
		<div className="editPost">
			<Container>
				<Row>
					<Col sm="12" md={{ size: 6, offset: 3 }}>

						{data && !uploadInProgress && !error && !formDirty && (
							<Alert color="success" fade={false}>
								Uploaded successfully.
							</Alert>
						)}

						<Card className="uploadForm">
							<CardBody>
								<input type="file" required onChange={handleFileChange}/>
								{/* <img src="https://via.placeholder.com/100/09f/fff.png%20C/O%20https://placeholder.com/" width="120"/> */}
								<Button color="primary" onClick={handleUpload}>Upload</Button>

							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default FileUpload;
