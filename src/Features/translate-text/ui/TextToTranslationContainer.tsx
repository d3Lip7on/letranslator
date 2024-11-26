import VoiceRecorder from '@Features/audio-input/ui/VoiceRecorder';
import { TranslationContainer } from './TranslationContainer';
import { AttachFiles } from '@Features/attach-files';

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
					<VoiceRecorder onTextGenerated={onEnter} lang={lang} />
					<button className="w-[70px] h-[70px] flex justify-center items-center">
						<img src="/icons/volume.svg" className="w-[50px] h-[50px]" alt="volume" />
					</button>
					<AttachFiles onClick={onAttachButtonClick} />
				</div>
				<p className="text-[24px] text-text-primary">{`${text.length}/${maxDigitsNumber}`}</p>
			</div>
		</TranslationContainer>
	);
}
