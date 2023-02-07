import { SessionProvider } from "next-auth/react";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: {
	Component: any;
	pageProps: { session: any };
}) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
