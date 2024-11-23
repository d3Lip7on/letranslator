import { TRANSLATE_SERVICE_BASE_URL } from '@Shared/api';

type TranslateProps = {
	text: string;
	to: string;
	from: string;
};

export async function translate({ text, to, from }: TranslateProps): Promise<Array<any>> {
	const response = await fetch(`${TRANSLATE_SERVICE_BASE_URL}/translate?api-version=3.0&to=${to}&from=${from}`, {
		body: JSON.stringify([{ text: text }]),
		method: 'POST',
		headers: {
			'Ocp-Apim-Subscription-Key': 'BDirFoiu3Vcjxm1fVqh8yHCtwulKXZyIIRRQKnb8p5qaweFUMRMnJQQJ99AKACfhMk5XJ3w3AAAbACOGFDFL',
			'Ocp-Apim-Subscription-Region': 'swedencentral',
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Something went wrong while translating');
	}

	const body = await response.text();

	return JSON.parse(body);
}
