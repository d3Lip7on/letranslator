import { Divider, Header } from '@Shared/ui';
import { TranslatorPaner } from './TranslatorPanel';

export function TranslatorPage() {
	return (
		<div className="w-full h-[100vh] bg-background-primary">
			<Header />
			<Divider />
			<TranslatorPaner />
		</div>
	);
}
