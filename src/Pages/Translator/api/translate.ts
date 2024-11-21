type TranslateProps = {
	text: string;
	to: string;
	from: string;
};

export async function translate({ text, to, from }: TranslateProps): Promise<string> {
	const response = await fetch('https://translatorserver2.azurewebsites.net/api/TranslateTrigger', {
		body: JSON.stringify({ text: text, to: to, from: from }),
		method: 'POST',
	});

	if (!response.ok) {
		throw new Error('Something went wrong while translating');
	}

	return response.text();
}
