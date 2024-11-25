import { getAccessToken } from './getAccessToken';

export async function getTransformedText(audioBlob: Blob, lang: string) {
	console.log('lang - ', lang);

	const accessToken = await getAccessToken();
	const uploadResponse = await fetch(
		`https://swedencentral.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${lang}`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'audio/wav',
				Accept: 'application/json',
			},
			body: audioBlob,
		}
	);

	if (!uploadResponse.ok) {
		throw new Error('Ошибка получения токена доступа');
	}
	const result = await uploadResponse.json();

	return result.DisplayText;
}
