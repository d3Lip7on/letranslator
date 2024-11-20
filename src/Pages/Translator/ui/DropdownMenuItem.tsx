type DropdownMenuItemProps = {
	name: string;
	onClick: () => void;
};

export function DropdownMenuItem({ name, onClick }: DropdownMenuItemProps) {
	return (
		<div
			className="h-[60px] py-[10px] text-[32px] hover:bg-text-primary hover:text-background-primary flex items-center justify-center cursor-pointer"
			onClick={onClick}
		>
			{name}
		</div>
	);
}
