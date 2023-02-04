import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body className="h-screen">
				<div className="flex h-full items-center justify-center">
					{children}
				</div>
			</body>
		</html>
	);
}
