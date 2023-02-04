"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Login() {
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("USER");

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		console.log({ userId, password, role });
	}
	return (
		<main className="flex flex-col items-center justify-center gap-5 rounded-2xl  bg-purple-600 p-9">
			<h1 className="text-xl">Login</h1>

			<div className="flex gap-6">
				<button
					onClick={() => setRole("USER")}
					className={`rounded bg-orange-500 px-6 py-2 ${
						role == "USER" ? "bg-orange-500" : "bg-gray-500"
					}`}
				>
					User
				</button>
				<button
					onClick={() => setRole("OWNER")}
					className={`rounded bg-orange-500 px-6 py-2 ${
						role == "OWNER" ? "bg-orange-500" : "bg-gray-500"
					}`}
				>
					Owner
				</button>
			</div>

			<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
				<div className="flex items-center gap-5">
					<label htmlFor="userId" className="text-sm">
						User Id
					</label>
					<input
						value={userId}
						onChange={e => setUserId(e.target.value)}
						name="userId"
						type={"text"}
						className="w-full rounded p-2 text-black"
					/>
				</div>

				<div className="flex items-center gap-5">
					<label htmlFor="password" className="text-sm">
						Password
					</label>
					<input
						value={password}
						onChange={e => setPassword(e.target.value)}
						name="password"
						type={"password"}
						className="w-full rounded p-2 text-black"
					/>
				</div>

				<button
					type="submit"
					className="rounded bg-neutral-200 p-2 text-purple-500"
				>
					Login
				</button>
			</form>

			{role === "USER" && (
				<div className="text-center">
					<p className="text-orange-400">Need an account?</p>
					<Link href={"/auth/signup"} className="italic underline">
						Click here to signup
					</Link>
				</div>
			)}
		</main>
	);
}
