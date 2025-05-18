import LLMRepository from './llm/repository';

import LLMService from './llm/service';
import MapsService from './maps/service';

import LLMController from './controller/llm.controller';

function createLLMRepository(db: any): LLMRepository {
	return new LLMRepository(db);
}

function createLLMService(repository: LLMRepository): LLMService {
	return new LLMService(repository);
}

function createMapsService(): MapsService {
	return new MapsService();
}

function createLLMController(
	service: LLMService,
	mapService: MapsService
): LLMController {
	return new LLMController(service, mapService);
}

export {
	// Repo
	createLLMRepository,

	// Service
	createLLMService,
	createMapsService,

	// Controller
	createLLMController,
};
