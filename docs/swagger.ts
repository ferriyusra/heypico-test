import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
		version: 'v0.0.1',
		title: 'Docs API service- Test',
		description: 'Docs API service- Test',
	},
	servers: [
		{
			url: 'http://localhost:9852/api',
			description: 'Local server',
		},
		{
			url: 'https://service--service-test.vercel.app/',
			description: 'Development server',
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
			},
		},
		schemas: {
			generateLLMRequest: {
				prompt: 'user33',
			},
		},
	},
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/api.ts'];

swaggerAutogen({
	openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
