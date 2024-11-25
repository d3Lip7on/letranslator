import { LanguageType } from '@Entities/language';
import { DropdownMenuItem } from './DropdownMenuItem';

type DropdownMenuProps = {
	languages: LanguageType[];
	onChange: (newLangObj: LanguageType) => void;
};

export function DropdownMenu({ onChange, languages }: DropdownMenuProps) {
	return (
		<div className="absolute top-0 left-0">
			<div
				className="p-[10px] rounded-l-[30px] rounded-br-[30px] border-[5px] border-primary bg-background-primary
			overflow-hidden"
			>
				<ul className="flex flex-col w-[185px] h-[610px]  overflow-y-auto overflow-x-hidden text-text-primary text-center bg-background-primary scrollbar-custom">
					{languages.map((item) => (
						<DropdownMenuItem
							name={item.name}
							onClick={() => {
								onChange(item);
							}}
							key={item.extendedCode}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}
