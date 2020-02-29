module.exports = {
    Query: {
		posts: () => [
            {
                title: 'boom',
                content: 'bamm',
                _id: 1
            },
            {
                title: 'boom2',
                content: 'bamm2',
                _id: 2
            }
        ],
	},
	Mutation: {
		editPost() {
			return null;
		}
	}
};
