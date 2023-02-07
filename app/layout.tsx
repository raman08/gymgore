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
					{/* <div className="flex h-[740px] m-9 w-[360px] overflow-y-scroll border-2 bg-neutral-800 items-center  justify-center rounded-xl "> */}
					<div className="min-w-[420px] flex justify-center items-center min-h-[740px] m-9 p-3 border-2 rounded-lg bg-neutral-800">
						{children}
					</div>

					{/* </div> */}
				</body>
			</SessionProvider>
		</html>
	);
}
