import { getAccessToken } from '@Shared/api';

const voiceMap: Record<string, string> = {
	'ru-RU': 'ru-RU-SvetlanaNeural',
	'en-US': 'en-US-JennyNeural',
	'pl-PL': 'pl-PL-ZofiaNeural',
};

function getVoiceName(lang: string): string {
	const voiceName = voiceMap[lang];
	if (!voiceName) throw new Error('language is not supported for audio playing');
	return voiceName;
}

type SsmlParams = {
	voiceName: string;
	text: string;
	lang: string;
};

function createSsml({ voiceName, lang, text }: SsmlParams) {
	return `
		<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}">
			<voice name="${voiceName}">${text}</voice>
		</speak>`;
}

async function audioFetch(ssml: string, accessToken: string) {
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
		throw new Error('audio fetch error');
	}

	const blob = await response.blob();
	return blob;
}

export async function getTextInAudio(text: string, lang: string): Promise<Blob> {
	const voiceName = getVoiceName(lang);
	const ssml = createSsml({ lang: lang, text: text, voiceName: voiceName });
	const accessToken = await getAccessToken();
	return await audioFetch(ssml, accessToken);
}
