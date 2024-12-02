import { Divider, Header } from '@Shared/ui';
import { TranslatorPanel } from '@Features/translate-text';

export function TranslatorPage() {
	return (
		<div className="w-full bg-background-primary">
			<Header />
			<Divider />
			<TranslatorPanel />
		</div>
	);
}
