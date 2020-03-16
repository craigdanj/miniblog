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
		{ data, loading: uploadInProgress, error }
	] = useMutation(UPLOAD_FILE);

	const handleFileChange = ({
		target: {
		  	validity,
		  	files: [file]
		}
	}) => validity.valid && uploadFile({ variables: { file } });

	return (
		<div className="editPost">
			<Container>
				<Row>
					<Col sm="12" md={{ size: 6, offset: 3 }}>
						<h3>File upload:</h3>
						{data && !uploadInProgress && !error && !formDirty && (
							<Alert color="success" fade={false}>
								Uploaded successfully.
							</Alert>
						)}
						<Card className="uploadForm">
							<CardBody>
								<input type="file" required onChange={handleFileChange}/>
								{uploadInProgress && <Spinner type="grow" color="primary" />}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default FileUpload;
