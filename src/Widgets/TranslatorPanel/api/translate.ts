import { BASE_URL } from '@Shared/api';

type TranslateProps = {
	text: string;
	to: string;
	from: string;
};

export async function translate({ text, to, from }: TranslateProps): Promise<string> {
	const response = await fetch(`${BASE_URL}/TranslateTrigger`, {
		body: JSON.stringify({ text: text, to: to, from: from }),
		method: 'POST',
	});

	if (!response.ok) {
		throw new Error('Something went wrong while translating');
	}

	return response.text();
}
