import { useState } from 'react';

type DropdownProps = {
	value: string;
	isOpen: boolean;
	onClick: () => void;
};

export function DropdownButton({ isOpen, onClick, value }: DropdownProps) {
	return (
		<button
			className="flex gap-[20px] items-center"
			onClick={() => {
				onClick();
			}}
		>
			<p className="text-[36px] font-bold text-text-primary">{value}</p>
			<div className="text-text-primary text-[36px]">{isOpen ? '<' : '>'}</div>
		</button>
	);
}
