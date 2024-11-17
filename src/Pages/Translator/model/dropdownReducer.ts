import { ActionType, DropdownMenusStateType } from './dropdownTypes';

export function dropdownReducer(state: DropdownMenusStateType, action: ActionType): DropdownMenusStateType {
	switch (action.type) {
		case 'INITIAL_LANGUAGE_DROPDOWN_CLICKED':
			return { ...state, isInitialLanguageDropdownOpen: !state.isInitialLanguageDropdownOpen, isTranslatedTextLanguageDropdownOpen: false };
		case 'TRANSLATED_LANGUAGE_DROPDOWN_CLICKED':
			return { ...state, isInitialLanguageDropdownOpen: false, isTranslatedTextLanguageDropdownOpen: !state.isTranslatedTextLanguageDropdownOpen };
		case 'INITIAL_LANGUAGE_CHOOSED':
			if (state.languageToTranslate != action.data) {
				return { ...state, initialLanguage: action.data || 'None', isInitialLanguageDropdownOpen: false };
			} else {
				return {
					...state,
					initialLanguage: state.languageToTranslate,
					languageToTranslate: state.initialLanguage,
					isInitialLanguageDropdownOpen: false,
				};
			}
		case 'TRANSLATED_LANGUAGE_CHOOSED':
			if (state.initialLanguage != action.data) {
				return { ...state, languageToTranslate: action.data || 'None', isTranslatedTextLanguageDropdownOpen: false };
			} else {
				return {
					...state,
					initialLanguage: state.languageToTranslate,
					languageToTranslate: state.initialLanguage,
					isTranslatedTextLanguageDropdownOpen: false,
				};
			}
		default:
			return state;
	}
}
