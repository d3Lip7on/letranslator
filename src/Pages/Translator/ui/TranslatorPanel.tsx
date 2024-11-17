import { useReducer, useState } from 'react';
import { TextToTranslationContainer } from './TextToTranslationContainer';
import { TranslatedTextContainer } from './TranslatedTextContainer';
import { DropdownButton } from './DropdownButton';
import { DropdownMenu } from './DropdownMenu';
import { languages } from '@Shared/data';
import { DropdownMenusStateType, dropdownReducer } from '../model';

export function TranslatorPaner() {
	const [text, setText] = useState('');
	const [translatedText, setTranslatedText] = useState('Перевод');

	const initialDropdownMenusState: DropdownMenusStateType = {
		isInitialLanguageDropdownOpen: false,
		isTranslatedTextLanguageDropdownOpen: false,
		initialLanguage: languages[0],
		languageToTranslate: languages[1],
	};

	const [dropdownMenusState, dropdownMenusStateDispatch] = useReducer(dropdownReducer, initialDropdownMenusState);

	function enterHandler(newText: string) {
		setText(newText);
	}

	function deleteHandler() {
		setText('');
	}

	return (
		<div className="flex gap-[50px] bg-background-primary px-[2%] pt-[100px]">
			<div className="w-[100%]">
				<div className="pl-[20px] mb-[5px]">
					<DropdownButton
						value={dropdownMenusState.initialLanguage}
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
							onChange={(newValue: string) => {
								dropdownMenusStateDispatch({
									type: 'INITIAL_LANGUAGE_CHOOSED',
									data: newValue,
								});
							}}
						/>
					)}
				</div>
			</div>

			<div className="w-[100%]">
				<div className="pl-[20px] mb-[5px]">
					<DropdownButton
						value={dropdownMenusState.languageToTranslate}
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
							onChange={(newValue: string) => {
								dropdownMenusStateDispatch({
									type: 'TRANSLATED_LANGUAGE_CHOOSED',
									data: newValue,
								});
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
