import VoiceRecorder from '@Features/audio-input/ui/VoiceRecorder';
import { TranslationContainer } from './TranslationContainer';
import { AttachFiles } from '@Features/attach-files';
import { VolumeButton } from '@Features/listen-text/ui/VolumeButton';

type TextToTranslationContainerProps = {
	lang: string;
	text: string;
	onEnter: (newText: string) => void;
	onDelete: () => void;
	onAttachButtonClick: () => void;
};

export function TextToTranslationContainer({ text, onEnter, onDelete, lang, onAttachButtonClick }: TextToTranslationContainerProps) {
	// max digits quantity in translation container
	const maxDigitsNumber = 1000;

	return (
		<TranslationContainer>
			<div className="flex flex-grow items-start">
				<textarea
					className="w-full h-full bg-background-primary text-[48px] text-text-primary resize-none scrollbar-custom"
					placeholder="Enter text"
					value={text}
					onChange={(e) => {
						onEnter(e.currentTarget.value);
					}}
					maxLength={maxDigitsNumber}
				/>
				<button
					className="p-[20px] "
					onClick={() => {
						onDelete();
					}}
				>
					<img src="/icons/close_button.svg" alt="close" />
				</button>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex gap-[40px] items-center">
					<VoiceRecorder onTextTransformedFromAudio={onEnter} lang={lang} />
					<VolumeButton text={text} lang={lang} />
					<AttachFiles onClick={onAttachButtonClick} />
				</div>
				<p className="text-[24px] text-text-primary">{`${text.length}/${maxDigitsNumber}`}</p>
			</div>
		</TranslationContainer>
	);
}
