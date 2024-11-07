import { TranslationContainer } from './TranslationContainer';

type TranstatedTextContainerProps = {
	translatedText: string;
};

export function TranstatedTextContainer({ translatedText }: TranstatedTextContainerProps) {
	return (
		<TranslationContainer>
			<p className="text-[48px] text-text-primary flex-grow">{translatedText}</p>
			<div className="flex justify-between items-center">
				<button>
					<img src="/volume.svg" className="w-[50px] h-[50px]" />
				</button>
				<button>
					<img src="/copy.svg" className="w-[50px] h-[50px]" />
				</button>
			</div>
		</TranslationContainer>
	);
}
