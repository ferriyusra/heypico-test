import express, { Request, Response, NextFunction, Router } from 'express';

import LLMController from '../modules/controller/llm.controller';

export class ApiRouter {
	private router: Router;
	private llmController: LLMController;

	constructor(llmController: LLMController) {
		this.router = express.Router();
		this.llmController = llmController;
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		// LLM Route
		this.router.post(
			'/v1/llms',
			(req: Request, res: Response, _next: NextFunction) =>
				this.llmController.create(req, res)
		);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default (llmController: LLMController): Router => {
	return new ApiRouter(llmController).getRouter();
};
