import { ChangeEvent, FormEvent, useEffect, useReducer, useRef, useState } from 'react';
import { TextToTranslationContainer, TranslatedTextContainer } from '@Features/translate-text';
import { DropdownButton, DropdownMenu, DropdownMenusStateType, dropdownReducer } from '@Features/change-translator-language';
import { languages, LanguageType } from '@Entities/language';
import { translate } from '@Features/translate-text';
import { AttachFiles, getTextFromDocument } from '@Features/attach-files';

const initialDropdownMenusState: DropdownMenusStateType = {
	isInitialLanguageDropdownOpen: false,
	isTranslatedTextLanguageDropdownOpen: false,
	initialLanguageObj: languages[0],
	languageToTranslateObj: languages[1],
};

export function TranslatorPanel() {
	const [text, setText] = useState('');
	const [translatedText, setTranslatedText] = useState<string>('Translate');
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);

	const [dropdownMenusState, dropdownMenusStateDispatch] = useReducer(dropdownReducer, initialDropdownMenusState);

	const [file, setFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const attachButtonRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		debounceTimer.current = setTimeout(async () => {
			if (text !== '') {
				try {
					const translatedText = await translate({
						text: text,
						to: dropdownMenusState.languageToTranslateObj.code,
						from: dropdownMenusState.initialLanguageObj.code,
					});
					setTranslatedText(translatedText);
				} catch (error) {
					console.error('Translation failed:', error);
					setTranslatedText('Error while translating');
				}
			} else {
				setTranslatedText('Translate');
			}
		}, 300);
	}, [dropdownMenusState.initialLanguageObj, dropdownMenusState.languageToTranslateObj, text]);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0]);
		}
	};

	const handleIconClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!file) {
			alert('Пожалуйста, выберите файл!');
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		try {
			const text = await getTextFromDocument(file);
			setText(text);
		} catch (error) {
			console.error('Ошибка:', error);
			alert('Ошибка при отправке файла!');
		}
	};

	function enterHandler(newText: string) {
		setText(newText);
	}

	function deleteHandler() {
		setText('');
		setTranslatedText('Tranlsate');
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
						setText(translatedText);
						setTranslatedText('');
					}}
					className="w-[50px] h-[50px] absolute top-[6px] left-[50%] translate-x-[-50%]"
				>
					<img src="/icons/exchange.svg" />
				</button>
			</div>

			<div className="flex gap-[50px] w-full">
				<div className="w-full">
					<div className="relative">
						<TextToTranslationContainer
							lang={dropdownMenusState.initialLanguageObj.extendedCode}
							text={text}
							onEnter={enterHandler}
							onDelete={deleteHandler}
							onAttachButtonClick={() => {
								attachButtonRef.current?.click();
							}}
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
				<div className="w-full">
					<div className="relative">
						<TranslatedTextContainer translatedText={translatedText} lang={dropdownMenusState.languageToTranslateObj.extendedCode} />
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
			<div>
				<form onSubmit={handleSubmit}>
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						style={{ display: 'none' }} // Скрываем стандартный input
					/>
					<button
						ref={attachButtonRef}
						type="button" // Используем type="button", чтобы не отправлять форму при клике на иконку
						className="hidden"
						onClick={handleIconClick}
					></button>
					{file != null && (
						<div className="flex gap-[20px] flex-col items-start pt-[30px]">
							<div className="flex gap-[40px]">
								<p className="text-[32px] text-text-primary">{file.name}</p>
								<button
									onClick={() => {
										setFile(null);
									}}
								>
									<img src="/icons/close_button.svg" alt="delete" />
								</button>
							</div>
							<button className="text-[32px] text-primary items-center" type="submit">
								Translate
							</button>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}
