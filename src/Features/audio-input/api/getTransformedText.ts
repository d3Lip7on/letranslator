import { getAccessToken } from '../../../Shared/api/getAccessToken';

export async function getTransformedText(audioBlob: Blob, lang: string) {
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
		throw new Error('Ошибка отправки аудио файла');
	}
	const result = await uploadResponse.json();

	return result.DisplayText;
}
