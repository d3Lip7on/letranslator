type DropdownMenuItemProps = {
	name: string;
	onClick: () => void;
};

export function DropdownMenuItem({ name, onClick }: DropdownMenuItemProps) {
	return (
		<div
			className="flex-shrink-0 h-[60px] py-[10px] text-[26px] leading-7 hover:bg-text-primary hover:text-background-primary flex items-center justify-center cursor-pointer"
			onClick={onClick}
		>
			{name}
		</div>
	);
}
