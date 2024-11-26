const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTextFromDocument(file: File) {
	const response1 = await fetch(
		'https://documentservice23.cognitiveservices.azure.com/formrecognizer/documentModels/prebuilt-read:analyze?api-version=2023-07-31',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/octet-stream',
				'Ocp-Apim-Subscription-Key': '77ysKi1JRdwIriapLhQU0hX5gA02LTHFftJUfR9VHgcC7GKnitwVJQQJ99AKACfhMk5XJ3w3AAALACOGqBuu',
			},
			body: file,
		}
	);

	if (!response1.ok) {
		throw new Error('Ошибка отправки документа');
	}

	const url = response1.headers.get('Operation-Location');
	if (!url) {
		throw new Error('Ошибка получения адреса документа');
	}

	await delay(3000);
	const response2 = await fetch(url, {
		method: 'GET',
		headers: {
			'Ocp-Apim-Subscription-Key': '77ysKi1JRdwIriapLhQU0hX5gA02LTHFftJUfR9VHgcC7GKnitwVJQQJ99AKACfhMk5XJ3w3AAALACOGqBuu',
		},
	});

	if (!response2.ok) {
		throw new Error('Ошибка получения переведенного документа');
	}

	const body = JSON.parse(await response2.text());
	return body.analyzeResult.content;
}
