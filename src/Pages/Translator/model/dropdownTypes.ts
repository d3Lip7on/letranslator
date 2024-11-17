export type ActionType = {
	type: ActionTypeType;
	data?: string;
};

export type ActionTypeType =
	| 'INITIAL_LANGUAGE_DROPDOWN_CLICKED'
	| 'TRANSLATED_LANGUAGE_DROPDOWN_CLICKED'
	| 'INITIAL_LANGUAGE_CHOOSED'
	| 'TRANSLATED_LANGUAGE_CHOOSED';

export type DropdownMenusStateType = {
	isInitialLanguageDropdownOpen: boolean;
	isTranslatedTextLanguageDropdownOpen: boolean;
	initialLanguage: string;
	languageToTranslate: string;
};
