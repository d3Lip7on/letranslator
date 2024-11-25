import { useReducer, useRef, useState } from 'react';
import { TextToTranslationContainer, TranslatedTextContainer } from '@Features/translate-text';
import { DropdownButton, DropdownMenu, DropdownMenusStateType, dropdownReducer } from '@Features/change-translator-language';
import { languages, LanguageType } from '@Entities/language';
import { translate } from '@Features/translate-text';
import VoiceRecorder from '@Features/audio-input/ui/VoiceRecorder';

export function TranslatorPanel() {
	const [text, setText] = useState('');
	const [translatedText, setTranslatedText] = useState<string>('Перевод');
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
					const value = await translate({
						text: newText,
						to: dropdownMenusState.languageToTranslateObj.code,
						from: dropdownMenusState.initialLanguageObj.code,
					});
					setTranslatedText(value[0].translations[0].text);
				} catch (error) {
					console.error('Translation failed:', error);
					setTranslatedText('Error while translating');
				}
			} else {
				setTranslatedText('Перевод');
			}
		}, 300);
	}

	function deleteHandler() {
		setText('');
		setTranslatedText('Перевод');
	}

	return (
		<div className="flex flex-col  px-[2%] pt-[100px]">
			<div className="relative">
				<div className="flex justify-between items-center justify-self-start w-full gap-[50px]">
					<div className="pl-[20px] mb-[5px] w-full">
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
					<div className="pl-[20px] mb-[5px] w-full">
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
				</div>
				<button
					onClick={() => {
						dropdownMenusStateDispatch({ type: 'LANGUAGES_EXCHANGED' });
					}}
					className="w-[50px] h-[50px] absolute top-[6px] left-[50%] translate-x-[-50%]"
				>
					<img src="/icons/exchange.svg" />
				</button>
			</div>

			<div className="flex gap-[50px] ">
				<div className="w-[100%]">
					<div className="relative">
						<TextToTranslationContainer
							lang={dropdownMenusState.initialLanguageObj.extendedCode}
							text={text}
							onEnter={enterHandler}
							onDelete={deleteHandler}
						/>
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
		</div>
	);
}
