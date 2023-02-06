"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<SessionProvider>
				<body className="flex items-center justify-center">
					<div className="flex h-[740px] w-[360px] border-2 bg-neutral-800 items-center  justify-center rounded-xl ">
						{children}
					</div>
				</body>
			</SessionProvider>
		</html>
	);
}
