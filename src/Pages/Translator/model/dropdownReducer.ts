import { ActionType, DropdownMenusStateType } from './dropdownTypes';

export function dropdownReducer(state: DropdownMenusStateType, action: ActionType): DropdownMenusStateType {
	switch (action.type) {
		case 'INITIAL_LANGUAGE_DROPDOWN_CLICKED':
			return { ...state, isInitialLanguageDropdownOpen: !state.isInitialLanguageDropdownOpen, isTranslatedTextLanguageDropdownOpen: false };
		case 'TRANSLATED_LANGUAGE_DROPDOWN_CLICKED':
			return { ...state, isInitialLanguageDropdownOpen: false, isTranslatedTextLanguageDropdownOpen: !state.isTranslatedTextLanguageDropdownOpen };
		case 'INITIAL_LANGUAGE_CHOOSED':
			if (action.data != null) {
				if (state.languageToTranslateObj.code != action.data.code) {
					return { ...state, initialLanguageObj: action.data, isInitialLanguageDropdownOpen: false };
				} else {
					return {
						...state,
						initialLanguageObj: state.languageToTranslateObj,
						languageToTranslateObj: state.initialLanguageObj,
						isInitialLanguageDropdownOpen: false,
					};
				}
			}
			return state;
		case 'TRANSLATED_LANGUAGE_CHOOSED':
			if (action.data != null) {
				if (state.initialLanguageObj.code != action.data.code) {
					return { ...state, languageToTranslateObj: action.data || 'None', isTranslatedTextLanguageDropdownOpen: false };
				} else {
					return {
						...state,
						initialLanguageObj: state.languageToTranslateObj,
						languageToTranslateObj: state.initialLanguageObj,
						isTranslatedTextLanguageDropdownOpen: false,
					};
				}
			}
			return state;
		case 'LANGUAGES_EXCHANGED':
			return { ...state, initialLanguageObj: state.languageToTranslateObj, languageToTranslateObj: state.initialLanguageObj };
		default:
			return state;
	}
}
