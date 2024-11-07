type ColorSchemeType = {
	primary: string; // чаще всего используется для привлечения внимания и создания узнаваемого образа
	background: {
		//фон страниц/элементов
		primary: string;
		secondary: string;
	};
	text: {
		// цвет текста
		primary: string;
		brand: string;
	};
};

export const colorScheme: ColorSchemeType = {
	primary: '#66FCF1',
	background: {
		primary: '#202833',
		secondary: '#FFFFFF3D',
	},
	text: {
		primary: '#EEEEEE',
		brand: '#0B0C10',
	},
};

module.exports = colorScheme;
