import { PrismaClient } from '@prisma/client';

class LLMRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async create(data: any) {
		return null;
	}
}

export default LLMRepository;
