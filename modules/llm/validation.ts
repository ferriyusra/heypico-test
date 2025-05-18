import * as Yup from 'yup';

export const createRequestLLM = Yup.object({
	prompt: Yup.string().required(),
});
