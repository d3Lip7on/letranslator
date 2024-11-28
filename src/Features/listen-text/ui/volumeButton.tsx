import { useState, useRef } from 'react';
import { getTextInAudio } from '../api/getTextInAudio';

type VolumeButtonProps = { text: string; lang: string };

export function VolumeButton({ text, lang }: VolumeButtonProps) {
	const [isLoading, setIsLoading] = useState(false); // Для отображения лоадера
	const [isPlaying, setIsPlaying] = useState(false); // Для отслеживания состояния воспроизведения
	const audioRef = useRef<HTMLAudioElement | null>(null); // Храним объект Audio между рендерами

	async function volumeButtonClickHandler() {
		if (isPlaying) {
			audioRef.current?.pause();
			audioRef.current = null;
			setIsPlaying(false);
			return;
		}

		try {
			setIsLoading(true);

			const audioBlob = await getTextInAudio(text, lang);
			const audioUrl = URL.createObjectURL(audioBlob);
			const audio = new Audio(audioUrl);

			audioRef.current = audio;

			audio.onended = () => {
				setIsPlaying(false);
				audioRef.current = null;
				URL.revokeObjectURL(audioUrl);
			};

			audio.onerror = () => {
				alert('Error playing audio');
				setIsPlaying(false);
				audioRef.current = null;
				URL.revokeObjectURL(audioUrl);
			};

			await audio.play();
			setIsPlaying(true);
		} catch (err) {
			console.error('Error loading or playing audio:', err);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<button disabled={isLoading} onClick={volumeButtonClickHandler} className="w-[70px] h-[70px] flex justify-center items-center relative">
			{isLoading ? (
				<div className="loader"></div>
			) : isPlaying ? (
				<img src="/icons/close_button.svg" className="w-[40px] h-[40px]" alt="cancel" />
			) : (
				<img src="/icons/volume.svg" className="w-[50px] h-[50px]" alt="volume" />
			)}
		</button>
	);
}
