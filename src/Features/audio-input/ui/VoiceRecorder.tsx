import { getTransformedText } from '../api/getTransformedText';
import { useVoiceRecorder } from '../model/hooks/useVoiceRecorder';

type VoiceRecorderProps = {
	onTextGenerated: (text: string) => void;
	lang: string;
};

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTextGenerated, lang }) => {
	
	const transformText = async (audioBlob: Blob) => {
		try {
			const transformedText = await getTransformedText(audioBlob, lang);
			onTextGenerated(transformedText);
		} catch (err) {
			console.log(err);
		}
	};

	const { isRecording, startRecording, stopRecording } = useVoiceRecorder({ onStop: transformText });

	const toggleRecording = async () => {
		if (isRecording) {
			stopRecording();
		} else {
			await startRecording();
		}
	};

	return (
		<button className={`rounded-full w-[70px] h-[70px] flex justify-center items-center ${isRecording && 'bg-slate-500'}`} onClick={toggleRecording}>
			<img src="/icons/mic.svg" alt="microphone" className="w-[50px] h-[50px]" />
		</button>
	);
};

export default VoiceRecorder;
