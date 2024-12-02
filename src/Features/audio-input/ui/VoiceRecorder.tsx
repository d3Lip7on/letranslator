import { useState } from 'react';
import { getTextFromAudio } from '../api/getTextFromAudio';
import { useVoiceRecorder } from '../model/hooks/useVoiceRecorder';

type VoiceRecorderProps = {
	onTextTransformedFromAudio?: (text: string) => void;
	lang: string;
};

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTextTransformedFromAudio, lang }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const voiceRecordingEndedHandler = async (audioBlob: Blob) => {
		try {
			setIsLoading(true);
			const textFromAudio = await getTextFromAudio(audioBlob, lang);
			if (onTextTransformedFromAudio) {
				onTextTransformedFromAudio(textFromAudio);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	const { isRecording, startRecording, stopRecording } = useVoiceRecorder({ onStop: voiceRecordingEndedHandler });

	const toggleRecording = async () => {
		if (isRecording) {
			stopRecording();
		} else {
			await startRecording();
		}
	};

	return (
		<button
			className={`rounded-full w-[70px] h-[70px] flex justify-center items-center ${isRecording && 'bg-slate-500'}`}
			onClick={toggleRecording}
			disabled={isLoading}
		>
			{isLoading ? <div className="loader"></div> : <img src="/icons/mic.svg" alt="microphone" className="w-[50px] h-[50px]" />}
		</button>
	);
};

export default VoiceRecorder;
