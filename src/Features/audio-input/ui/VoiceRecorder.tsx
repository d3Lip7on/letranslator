import React, { useState, useRef } from 'react';

const VoiceRecorder: React.FC = () => {
	const [isRecording, setIsRecording] = useState(false);
	const [audioURL, setAudioURL] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunks = useRef<Blob[]>([]);

	const startRecording = async () => {
		try {
			setError(null);
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;

			audioChunks.current = [];

			mediaRecorder.ondataavailable = (event) => {
				audioChunks.current.push(event.data);
			};

			mediaRecorder.onstop = () => {
				const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
				const audioUrl = URL.createObjectURL(audioBlob);
				setAudioURL(audioUrl);

				// Если нужно создать файл:
				const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
				console.log('Созданный файл:', audioFile);
			};

			mediaRecorder.start();
			setIsRecording(true);
		} catch (err) {
			setError('Ошибка доступа к микрофону: ' + (err as Error).message);
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	return (
		<div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
			<h1 className="text-2xl font-bold text-gray-700">Голосовая запись</h1>

			{error && <div className="p-2 text-sm text-red-600 bg-red-100 rounded">{error}</div>}

			<button
				onClick={isRecording ? stopRecording : startRecording}
				className={`px-4 py-2 text-white rounded ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
			>
				{isRecording ? 'Остановить запись' : 'Начать запись'}
			</button>

			{audioURL && (
				<audio controls src={audioURL} className="mt-4">
					Ваш браузер не поддерживает воспроизведение аудио.
				</audio>
			)}
		</div>
	);
};

export default VoiceRecorder;
