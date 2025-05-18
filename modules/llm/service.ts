import axios from 'axios';
import { config } from '../../config';
import LLMRepository from './repository';
import logger from '../../util/logger';

class LLMService {
	constructor(private readonly llmRepository: LLMRepository) {}

	async generateRequest(prompt: string) {
		try {
			const llmHost = config.llm.llmHost;
			if (!llmHost) {
				throw new Error('LLM host is not defined');
			}

			const buildBetterPrompt = buildPromptFromUserInput(prompt);

			const response = await axios.post(`${llmHost}/api/generate`, {
				model: 'llama3.2',
				prompt: buildBetterPrompt,
				stream: false,
			});

			return response.data.response;
		} catch (error) {
			throw new Error('Error generating request to LLM');
		}
	}
}

function buildPromptFromUserInput(userInput: string): string {
	return `
				Kamu adalah asisten pencari tempat.

				Berikut permintaan dari user:
				"${userInput}"

				Berikan daftar tempat berdasarkan permintaan tersebut.
				Format output:
				1. **Nama Tempat**: Deskripsi singkat, di [lokasi].

				Jika membuat asumsi, mohon dijelaskan.
				`.trim();
}

export default LLMService;
