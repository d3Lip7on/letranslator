import { useState } from 'react';
import { TextToTranslationContainer } from './TextToTranslationContainer';
import { TranstatedTextContainer } from './TranslatedTextContainer';
import { DropdownButton } from './DropdownButton';
import { DropdownMenu } from './DropdownMenu';

export function TranslatorPaner() {
	const [text, setText] = useState('');
	const [translatedText, setTranslatedText] = useState('Перевод');

	const [isTextToTranslateLanguageDropdownOpen, setIsTextToTranslateLanguageDropdownOpen] = useState(false);
	const [initialLanguage, setInitialLanguage] = useState('English');

	const [isTranslatedTextLanguageDropdownOpen, setIsTranslatedTextLanguageDropdownOpen] = useState(false);
	const [languageToTranslate, setLanguageToTranslate] = useState('Russian');

	function textToTranslateDropdownClickHandler() {
		setIsTextToTranslateLanguageDropdownOpen(!isTextToTranslateLanguageDropdownOpen);
	}

	function translatedTextDropdownClickHandler() {
		setIsTranslatedTextLanguageDropdownOpen(!isTranslatedTextLanguageDropdownOpen);
	}

	function enterHandler(newText: string) {
		setText(newText);
	}

	function deleteHandler() {
		setText('');
	}

	function textToTranslateDropdownMenuItemClickHandler(newValue: string) {
		setInitialLanguage(newValue);
		setIsTextToTranslateLanguageDropdownOpen(false);
	}

	function translatedTextDropdownMenuItemClickHandler(newValue: string) {
		setLanguageToTranslate(newValue);
		setIsTranslatedTextLanguageDropdownOpen(false);
	}

	return (
		<div className="flex gap-[50px] bg-background-primary px-[2%] pt-[100px]">
			<div className="w-[100%]">
				<div className="pl-[20px] mb-[5px]">
					<DropdownButton value={initialLanguage} isOpen={isTextToTranslateLanguageDropdownOpen} onClick={textToTranslateDropdownClickHandler} />
				</div>
				<div className="relative">
					<TextToTranslationContainer text={text} onEnter={enterHandler} onDelete={deleteHandler} />
					{isTextToTranslateLanguageDropdownOpen && <DropdownMenu onChange={textToTranslateDropdownMenuItemClickHandler} />}
				</div>
			</div>

			<div className="w-[100%]">
				<div className="pl-[20px] mb-[5px]">
					<DropdownButton value={languageToTranslate} isOpen={isTranslatedTextLanguageDropdownOpen} onClick={translatedTextDropdownClickHandler} />
				</div>
				<div className="relative">
					<TranstatedTextContainer translatedText={translatedText} />
					{isTranslatedTextLanguageDropdownOpen && <DropdownMenu onChange={translatedTextDropdownMenuItemClickHandler} />}
				</div>
			</div>
		</div>
	);
}
