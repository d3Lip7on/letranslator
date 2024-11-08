import { TranslationContainer } from './TranslationContainer';

type TextToTranslationContainerProps = {
	text: string;
	onEnter: (newText: string) => void;
	onDelete: () => void;
};

export function TextToTranslationContainer({ text, onEnter, onDelete }: TextToTranslationContainerProps) {
	const maxDigitsNumber = 3;

	return (
		<TranslationContainer>
			<div className="flex flex-grow items-start">
				<textarea
					className="w-full h-full bg-background-primary text-[48px] text-text-primary resize-none"
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
					<img src="/close_button.svg" alt="close" />
				</button>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex gap-[40px] items-center">
					<button>
						<img src="/mic.svg" alt="microphone" className="w-[50px] h-[50px]" />
					</button>
					<button>
						<img src="/volume.svg" alt="volume" className="w-[50px] h-[50px]" />
					</button>
				</div>
				<p className="text-[24px] text-text-primary">{`${text.length}/${maxDigitsNumber}`}</p>
			</div>
		</TranslationContainer>
	);
}
