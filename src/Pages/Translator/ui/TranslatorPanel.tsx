import { useReducer, useRef, useState } from 'react';
import { TextToTranslationContainer } from './TextToTranslationContainer';
import { TranslatedTextContainer } from './TranslatedTextContainer';
import { DropdownButton } from './DropdownButton';
import { DropdownMenu } from './DropdownMenu';
import { languages } from '@Shared/data';
import { DropdownMenusStateType, dropdownReducer } from '../model';
import { translate } from '../api';
import { LanguageType } from '@Shared/data/languages';

export function TranslatorPanel() {
	const [text, setText] = useState('');
	const [translatedText, setTranslatedText] = useState('Перевод');
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);

	const initialDropdownMenusState: DropdownMenusStateType = {
		isInitialLanguageDropdownOpen: false,
		isTranslatedTextLanguageDropdownOpen: false,
		initialLanguageObj: languages[0],
		languageToTranslateObj: languages[1],
	};

	const [dropdownMenusState, dropdownMenusStateDispatch] = useReducer(dropdownReducer, initialDropdownMenusState);

	function enterHandler(newText: string) {
		setText(newText);

		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		debounceTimer.current = setTimeout(async () => {
			if (newText !== '') {
				try {
					const value = await translate(newText);
					setTranslatedText(value);
				} catch (error) {
					console.error('Translation failed:', error);
					setTranslatedText('Error while translating');
				}
			} else {
				setTranslatedText('Перевод');
			}
		}, 1000);
	}

	function deleteHandler() {
		setText('');
		setTranslatedText('Перевод');
	}

	return (
		<div className="flex gap-[50px] bg-background-primary px-[2%] pt-[100px]">
			<div className="w-[100%]">
				<div className="pl-[20px] mb-[5px]">
					<DropdownButton
						value={dropdownMenusState.initialLanguageObj.name}
						isOpen={dropdownMenusState.isInitialLanguageDropdownOpen}
						onClick={() => {
							dropdownMenusStateDispatch({
								type: 'INITIAL_LANGUAGE_DROPDOWN_CLICKED',
							});
						}}
					/>
				</div>
				<div className="relative">
					<TextToTranslationContainer text={text} onEnter={enterHandler} onDelete={deleteHandler} />
					{dropdownMenusState.isInitialLanguageDropdownOpen && (
						<DropdownMenu
							languages={languages}
							onChange={(newLangObj: LanguageType) => {
								dropdownMenusStateDispatch({
									type: 'INITIAL_LANGUAGE_CHOOSED',
									data: newLangObj,
								});
							}}
						/>
					)}
				</div>
			</div>

			<div className="w-[100%]">
				<div className="pl-[20px] mb-[5px]">
					<DropdownButton
						value={dropdownMenusState.languageToTranslateObj.name}
						isOpen={dropdownMenusState.isTranslatedTextLanguageDropdownOpen}
						onClick={() => {
							dropdownMenusStateDispatch({
								type: 'TRANSLATED_LANGUAGE_DROPDOWN_CLICKED',
							});
						}}
					/>
				</div>
				<div className="relative">
					<TranslatedTextContainer translatedText={translatedText} />
					{dropdownMenusState.isTranslatedTextLanguageDropdownOpen && (
						<DropdownMenu
							languages={languages}
							onChange={(newLangObj: LanguageType) => {
								dropdownMenusStateDispatch({
									type: 'TRANSLATED_LANGUAGE_CHOOSED',
									data: newLangObj,
								});
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
