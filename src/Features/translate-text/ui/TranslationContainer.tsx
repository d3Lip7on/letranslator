type TranslationContainerProps = {
	children: React.ReactNode;
};

export function TranslationContainer({ children }: TranslationContainerProps) {
	return (
		<div className="flex flex-col w-full h-[350px] rounded-[30px] bg-background-primary border-[5px] border-primary px-[30px] py-[20px]">
			{children}
		</div>
	);
}
