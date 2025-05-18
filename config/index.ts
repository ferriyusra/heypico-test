import { deepFreeze } from '../util';

interface AppConfig {
	env: string;
	apiKey?: string;
	name: string;
	port: number;
	version?: string;
	debug: boolean;
}

interface AuthConfig {
	jwtSecret?: string;
}

interface QueryConfig {
	limitDefault: number;
	sortDefault: string;
}

interface LLMConfig {
	llmHost?: string;
}
interface MapsConfig {
	apiKey?: string;
}

interface Config {
	app: AppConfig;
	auth: AuthConfig;
	query: QueryConfig;
	llm: LLMConfig;
	maps: MapsConfig;
}

const config: Config = {
	app: {
		env: process.env.NODE_ENV || 'development',
		apiKey: process.env.APP_API_KEY,
		name: process.env.APP_NAME || 'service-be',
		port: Number(process.env.APP_PORT) || 3000,
		version: process.env.APP_VERSION,
		debug: !!process.env.APP_DEBUG,
	},
	auth: {
		jwtSecret: process.env.AUTH_JWT_SECRET,
	},
	query: {
		limitDefault: Number(process.env.QUERY_LIMIT_DEFAULT) || 10,
		sortDefault: process.env.QUERY_SORT_DEFAULT || 'created_at desc',
	},
	llm: {
		llmHost: process.env.LLM_HOST || 'http://localhost:11434',
	},
	maps: {
		apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
	},
};

const dbConfig = deepFreeze(config);

export { dbConfig as config };
