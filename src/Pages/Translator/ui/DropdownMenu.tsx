import { DropdownMenuItem } from './DropdownMenuItem';

type DropdownMenuProps = {
	onChange: (newValue: string) => void;
};

export function DropdownMenu({ onChange }: DropdownMenuProps) {
	const items = [
		'English',
		'Spanish',
		'French',
		'German',
		'Chinese',
		'Japanese',
		'Korean',
		'Italian',
		'Russian',
		'Portuguese',
		'Arabic',
		'Hindi',
		'Bengali',
		'Turkish',
		'Vietnamese',
		'Thai',
		'Swedish',
		'English',
		'Spanish',
		'French',
		'German',
		'Chinese',
		'Japanese',
		'Korean',
		'Italian',
		'Russian',
		'Portuguese',
		'Arabic',
		'Hindi',
		'Bengali',
		'Turkish',
		'Vietnamese',
		'Thai',
		'Swedish',
	];
	return (
		<div className="absolute top-0 left-0">
			<div
				className="p-[10px] rounded-l-[30px] rounded-br-[30px] border-[5px] border-primary bg-background-primary
			overflow-hidden"
			>
				<ul className="flex flex-col w-[185px] h-[610px]  overflow-y-auto overflow-x-hidden text-text-primary text-center bg-background-primary scrollbar-custom">
					{items.map((item) => (
						<DropdownMenuItem
							value={item}
							onClick={() => {
								onChange(item);
							}}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}
