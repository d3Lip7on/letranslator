// hooks/useVoiceRecorder.ts
import { useRef, useState } from 'react';
import { convertAudioToWav } from '../utilities/convertAudioToWav';

export const useVoiceRecorder = ({ onStop }: { onStop: (blob: Blob) => void }) => {
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunks = useRef<Blob[]>([]);
	const [isRecording, setIsRecording] = useState(false);

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream, {
				mimeType: 'audio/webm',
			});
			mediaRecorderRef.current = mediaRecorder;

			audioChunks.current = [];

			mediaRecorder.ondataavailable = (event) => {
				audioChunks.current.push(event.data);
			};

			mediaRecorder.onstop = () => {
				const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
				convertAudioToWav(audioBlob).then((wavBlob) => {
					onStop(wavBlob);
				});
			};

			mediaRecorder.start();
			setIsRecording(true);
		} catch (err) {}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	return {
		isRecording,
		startRecording,
		stopRecording,
	};
};
