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
			<img
				className="w-[20px] h-[20px] relative top-[3px] transition-transform duration-100"
				src="/icons/arrow-right.svg"
				style={{
					transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
				}}
			/>
		</button>
	);
}
