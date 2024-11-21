import { Divider, Header } from '@Shared/ui';
import { TranslatorPanel } from '@Widgets/TranslatorPanel';

export function TranslatorPage() {
	return (
		<div className="w-full h-[100vh] bg-background-primary">
			<Header />
			<Divider />
			<TranslatorPanel />
		</div>
	);
}
