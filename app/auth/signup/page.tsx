"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AiFillApple, AiFillGoogleCircle } from "react-icons/ai";
import { RiFacebookCircleFill } from "react-icons/ri";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userId, setUserId] = useState("");

	const router = useRouter();

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		console.log({ name, email, password, userId });

		try {
			const data = await axios.post("/api/auth/register", {
				name,
				email,
				password,
				userId,
			});

			console.log(data);

			router.push("/auth/login");
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<main className="flex flex-col items-center justify-center gap-5 rounded-2xl  bg-purple-600 p-7">
			<h1 className="text-xl">SignUp</h1>

			<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
				<div className="flex items-center gap-5">
					<label htmlFor="name" className="text-sm">
						Name
					</label>
					<input
						value={name}
						onChange={e => setName(e.target.value)}
						name="name"
						type={"text"}
						className="w-full rounded p-2 text-black"
					/>
				</div>

				<div className="flex items-center gap-5">
					<label htmlFor="email" className="text-sm">
						Email
					</label>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						name="email"
						type={"email"}
						className="w-full rounded p-2 text-black"
					/>
				</div>

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
					Register Now
				</button>

				{/* <div className="flex items-center gap-2 self-center"> */}
				{/* 	<div className="h-0.5 w-36 bg-purple-100"></div> */}
				{/* 	<span className="text-md italic">or</span> */}
				{/* 	<div className="h-0.5 w-36 bg-purple-100"></div> */}
				{/* </div> */}

				{/* <div className="flex flex-col items-center justify-center gap-5"> */}
				{/* 	<button */}
				{/* 		onClick={() => */}
				{/* 			signIn("google", { */}
				{/* 				redirect: true, */}
				{/* 				callbackUrl: "/", */}
				{/* 			}) */}
				{/* 		} */}
				{/* 		className="flex items-center gap-3 self-center" */}
				{/* 	> */}
				{/* 		<AiFillGoogleCircle size={20} /> */}
				{/* 		<span>Signup with google</span> */}
				{/* 	</button> */}
				{/* 	<button */}
				{/* 		onClick={() => */}
				{/* 			signIn("facebook", { */}
				{/* 				redirect: true, */}
				{/* 				callbackUrl: "/", */}
				{/* 			}) */}
				{/* 		} */}
				{/* 		className="flex items-center gap-3 self-center" */}
				{/* 	> */}
				{/* 		<RiFacebookCircleFill size={20} /> */}
				{/* 		<span>Signup with facebook</span> */}
				{/* 	</button> */}
				{/* 	<button */}
				{/* 		onClick={() => */}
				{/* 			signIn("apple", { */}
				{/* 				redirect: true, */}
				{/* 				callbackUrl: "/", */}
				{/* 			}) */}
				{/* 		} */}
				{/* 		className="flex items-center gap-3 self-center" */}
				{/* 	> */}
				{/* 		<AiFillApple size={20} /> */}
				{/* 		<span>Signup with apple</span> */}
				{/* 	</button> */}
				{/* </div> */}

				<div className="text-center">
					<p className="text-orange-400">Already Have an account?</p>
					<Link href={"/auth/login"} className="italic underline">
						Click here to login
					</Link>
				</div>
			</form>
		</main>
	);
}
