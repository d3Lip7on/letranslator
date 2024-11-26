import { TranslationContainer } from './TranslationContainer';

type TranstatedTextContainerProps = {
	translatedText: string;
};

export function TranslatedTextContainer({ translatedText }: TranstatedTextContainerProps) {
	return (
		<TranslationContainer>
			<p className="text-[48px] text-text-primary flex-grow w-full break-words overflow-y-auto scrollbar-custom">{translatedText}</p>
			<div className="flex justify-between items-center">
				<button className="w-[70px] h-[70px]">
					<img src="/icons/volume.svg" className="w-[50px] h-[50px]" />
				</button>
				<button className="w-[70px] h-[70px]">
					<img src="/icons/copy.svg" className="w-[50px] h-[50px]" />
				</button>
			</div>
		</TranslationContainer>
	);
}
