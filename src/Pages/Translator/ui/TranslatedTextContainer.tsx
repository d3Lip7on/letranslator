import { TranslationContainer } from './TranslationContainer';

type TranstatedTextContainerProps = {
	translatedText: string;
};

export function TranslatedTextContainer({ translatedText }: TranstatedTextContainerProps) {
	return (
		<TranslationContainer>
			<p className="text-[48px] text-text-primary flex-grow">{translatedText}</p>
			<div className="flex justify-between items-center">
				<button>
					<img src="/icons/volume.svg" className="w-[50px] h-[50px]" />
				</button>
				<button>
					<img src="/icons/copy.svg" className="w-[50px] h-[50px]" />
				</button>
			</div>
		</TranslationContainer>
	);
}
