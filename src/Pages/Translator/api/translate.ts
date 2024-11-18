export async function translate(text: string): Promise<string> {
	const response = await fetch('https://translatorserver2.azurewebsites.net/api/TranslateTrigger', {
		body: JSON.stringify({ text: text, to: 'ru' }),
		method: 'POST',
	});

	if (!response.ok) {
		throw new Error('Something went wrong while translating');
	}

	return response.text();
}
