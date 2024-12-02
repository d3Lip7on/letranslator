import { getAccessToken } from '@Shared/api/getAccessToken';

export async function getTextFromAudio(audioBlob: Blob, lang: string) {
	const accessToken = await getAccessToken();
	const response = await fetch(
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

	if (!response.ok) {
		throw new Error('Ошибка отправки аудио файла');
	}
	const result = await response.json();

	return result.DisplayText;
}
