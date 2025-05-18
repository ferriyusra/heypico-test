import { Response, Request } from 'express';
import response from '../../util/response';
import LLMService from '../llm/service';
import MapsService from '../maps/service';

class LLMControler {
	constructor(
		private readonly llmService: LLMService,
		private readonly mapsService: MapsService
	) {}

	async create(req: Request, res: Response) {
		try {
			const { prompt } = req.body;

			const prompting = await this.llmService.generateRequest(prompt);

			const generateLinkDirection = await this.mapsService.generate(prompting);

			return response.success(
				res,
				{
					prompting,
					maps: generateLinkDirection,
				},
				'Success'
			);
		} catch (error) {
			console.log(error);
			return response.error(res, error, 'Failed');
		}
	}
}

export default LLMControler;
