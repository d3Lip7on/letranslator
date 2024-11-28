import { VolumeButton } from '@Features/listen-text/ui/VolumeButton';
import { TranslationContainer } from './TranslationContainer';

type TranstatedTextContainerProps = {
	translatedText: string;
	lang: string;
};

export function TranslatedTextContainer({ translatedText, lang }: TranstatedTextContainerProps) {
	return (
		<TranslationContainer>
			<p className="text-[48px] text-text-primary flex-grow w-full break-words overflow-y-auto scrollbar-custom">{translatedText}</p>
			<div className="flex justify-between items-center">
				<VolumeButton text={translatedText} lang={lang} />
			</div>
		</TranslationContainer>
	);
}
