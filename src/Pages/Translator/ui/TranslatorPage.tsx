import { Divider, Header } from '@Shared/ui';
import { TextToTranslationContainer } from './TextToTranslationContainer';
import { TranstatedTextContainer } from './TranslatedTextContainer';

export function TranslatorPage() {
	return (
		<div className="w-full h-[100vh] bg-background-primary">
			<Header />
			<Divider />
			<div className="flex gap-[50px] bg-background-primary px-[2%] pt-[100px]">
				<TextToTranslationContainer />
				<TranstatedTextContainer />
			</div>
		</div>
	);
}
