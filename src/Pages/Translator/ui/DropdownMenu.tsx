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
	];
	return (
		<div className="absolute top-0 left-0">
			<ul className="flex flex-col w-[185px] h-[610px] rounded-l-[30px] rounded-br-[30px] border-[5px] border-primary overflow-y-auto overflow-x-hidden text-text-primary text-center bg-background-primary">
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
	);
}
