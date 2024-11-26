import { getAccessToken } from '@Shared/api';

export async function getTextInAudio(text: string, lang: string): Promise<Blob> {
	const accessToken = await getAccessToken();

	// Подбор подходящего голоса в зависимости от выбранного языка
	let voiceName: string;
	switch (lang) {
		case 'ru-RU':
			voiceName = 'ru-RU-SvetlanaNeural'; // Пример голоса для русского языка
			break;
		case 'en-US':
			voiceName = 'en-US-JennyNeural'; // Пример голоса для английского языка
			break;
		case 'pl-PL':
			voiceName = 'pl-PL-ZofiaNeural'; // Пример голоса для польского языка
			break;
		default:
			throw new Error(`Unsupported language: ${lang}`);
	}

	const ssml = `
		<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}">
			<voice name="${voiceName}">${text}</voice>
		</speak>`;

	const response = await fetch('https://swedencentral.tts.speech.microsoft.com/cognitiveservices/v1', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/ssml+xml',
			'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
			Authorization: `Bearer ${accessToken}`,
		},
		body: ssml,
	});

	if (!response.ok) {
		throw new Error('ошибка отправки текста для генерации аудио');
	}

	const blob = await response.blob();
	return blob;
}
