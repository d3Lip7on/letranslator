import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';

export function AttachFiles({ onClick }: { onClick: () => void }) {
	return (
		<button className="w-[70px] h-[70px] flex justify-center items-center" onClick={onClick}>
			<img src="/icons/attachment.svg" className="w-[50px] h-[50px]" alt="attach" />
		</button>
	);
}
