export async function getAccessToken(): Promise<string> {
	const accessTokenResponse = await fetch(`https://swedencentral.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
		method: 'POST',
		headers: {
			'Ocp-Apim-Subscription-Key': '4z8ef2CNUHkkXClFlUdE6SDQO9bBWqBQ2AwYj9bghqjuFxVGeTBwJQQJ99AKACfhMk5XJ3w3AAAYACOGOWfI',
		},
	});

	if (!accessTokenResponse.ok) {
		throw new Error('Ошибка получения токена доступа');
	}

	const accessToken = await accessTokenResponse.text();
	return accessToken;
}
