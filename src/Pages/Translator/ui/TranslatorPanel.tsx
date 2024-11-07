import { useState } from 'react';
import { TextToTranslationContainer } from './TextToTranslationContainer';
import { TranstatedTextContainer } from './TranslatedTextContainer';

export function TranslatorPaner() {
	const [text, setText] = useState('');
	const [translatedText, setTranslatedText] = useState('Перевод');

	function enterHandler(newText: string) {
		setText(newText);
	}

	function deleteHandler() {
		setText('');
	}

	return (
		<div className="flex gap-[50px] bg-background-primary px-[2%] pt-[100px]">
			<TextToTranslationContainer text={text} onEnter={enterHandler} onDelete={deleteHandler} />
			<TranstatedTextContainer translatedText={translatedText} />
		</div>
	);
}
