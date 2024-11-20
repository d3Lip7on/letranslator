import { LanguageType } from '@Shared/data/languages';

export type ActionType = {
	type: ActionTypeType;
	data?: LanguageType;
};

export type ActionTypeType =
	| 'INITIAL_LANGUAGE_DROPDOWN_CLICKED'
	| 'TRANSLATED_LANGUAGE_DROPDOWN_CLICKED'
	| 'INITIAL_LANGUAGE_CHOOSED'
	| 'TRANSLATED_LANGUAGE_CHOOSED'
	| 'LANGUAGES_EXCHANGED';

export type DropdownMenusStateType = {
	isInitialLanguageDropdownOpen: boolean;
	isTranslatedTextLanguageDropdownOpen: boolean;
	initialLanguageObj: LanguageType;
	languageToTranslateObj: LanguageType;
};
