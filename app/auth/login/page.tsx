"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { AiFillGoogleCircle, AiFillApple } from "react-icons/ai";
import { RiFacebookCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function Login() {
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("USER");
	const router = useRouter();

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		console.log({ userId, password, role });

		try {
			const user = await signIn("credentials", {
				redirect: false,
				userId,
				password,
			});

			console.log(user);
			router.push('/')
		} catch (err) {
			console.error(err);
		}
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
				<>
					<div className="flex items-center gap-2 self-center">
						<div className="h-0.5 w-36 bg-purple-100"></div>
						<span className="text-md italic">or</span>
						<div className="h-0.5 w-36 bg-purple-100"></div>
					</div>

					<div className="flex flex-col items-center justify-center gap-5">
						<button
							onClick={() =>
								signIn("google", {
									redirect: true,
									callbackUrl: "/",
								})
							}
							className="flex items-center gap-3 self-center"
						>
							<AiFillGoogleCircle size={20} />
							<span>Signup with google</span>
						</button>
						<button
							onClick={() =>
								signIn("facebook", {
									redirect: true,
									callbackUrl: "/",
								})
							}
							className="flex items-center gap-3 self-center"
						>
							<RiFacebookCircleFill size={20} />
							<span>Signup with facebook</span>
						</button>
						<button
							onClick={() =>
								signIn("apple", {
									redirect: true,
									callbackUrl: "/",
								})
							}
							className="flex items-center gap-3 self-center"
						>
							<AiFillApple size={20} />
							<span>Signup with apple</span>
						</button>
					</div>
					<div className="text-center">
						<p className="text-orange-400">Need an account?</p>
						<Link
							href={"/auth/signup"}
							className="italic underline"
						>
							Click here to signup
						</Link>
					</div>
				</>
			)}
		</main>
	);
}
