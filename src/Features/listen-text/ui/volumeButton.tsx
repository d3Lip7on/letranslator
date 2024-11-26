import { getTextInAudio } from '../api/getTextInAudio';

export function VolumeButton({ text, lang }: { text: string; lang: string }) {
	return (
		<button
			onClick={async () => {
				const audioBlob = await getTextInAudio(text, lang);
				const audioUrl = URL.createObjectURL(audioBlob);
				const audio = new Audio(audioUrl);
				audio.play();
			}}
			className="w-[70px] h-[70px] flex justify-center items-center"
		>
			<img src="/icons/volume.svg" className="w-[50px] h-[50px]" alt="volume" />
		</button>
	);
}
