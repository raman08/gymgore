"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
	const { data } = useSession();
	console.log(data);
	return (
		<main className={styles.main}>
			<h1>
				Hii
				{data?.user ? ` ${data?.user?.name}` : " no one"}
				<br />
				{data?.user ? (
					<button className="m-3" onClick={() => signOut()}>
						Logout
					</button>
				) : (
					<Link className="m-3" href={"/auth/login"}>
						{" "}
						Go to login
					</Link>
				)}
			</h1>
		</main>
	);
}
