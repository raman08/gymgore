"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
	const { data } = useSession();
	console.log(data);
	return (
		<main className="flex flex-col items-center justify-center gap-4">
			{data?.user ? (
				<>
					<h1>
						Hii
						{data?.user ? ` ${data?.user?.name}` : " no one"}
						<br />
					</h1>
					<button
						className="rounded-2xl border-2 p-3"
						onClick={() => signOut()}
					>
						Logout
					</button>
				</>
			) : (
				<Link className="rounded-2xl border-2 p-3" href={"/auth/login"}>
					{" "}
					Go to login
				</Link>
			)}
		</main>
	);
}
