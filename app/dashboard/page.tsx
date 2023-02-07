"use client";

import { EntryLog } from "@/components/Entrylog";
import axios from "axios";
import { FormEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";
import useSWR from "swr";

const fetcher = url => axios.get(url).then(res => res.data);

export default function Home() {
	const { data, error, isLoading } = useSWR("/api/getUser", fetcher);

	const [scanData, setScanData] = useState("");
	const [inputCode, setInputCode] = useState("");

	function handleCodeFormSubmit(e: FormEvent) {
		e.preventDefault();
		console.log(inputCode);
	}

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Something Went Wrong</p>;
	}

	return (
		<main className="w-full h-full flex flex-col items-center justify-center px-8">
			{data.user.role === "USER" ? (
				<>
					<div className="w-full flex flex-col items-center justify-center">
						<div className="z-10 text-center flex flex-col justify-center items-center">
							<img
								className="rounded-full m-2 border-2"
								src={data.user.image}
								alt="User image"
							/>
							<span className="mb-2">{data.user.name}</span>
						</div>

						<div className="-translate-y-14 pt-14 px-3 self-center  bg-yellow-600 w-full pb-2 text-center rounded-xl">
							<QRCode
								className="p-2 bg-purple-50 rounded-lg flex self-center m-0"
								value={data.user.referalCode}
								style={{ width: "100%" }}
							/>

							<div className="flex flex-col gap-0 mt-3">
								<span className="text-sm font-bold">
									User Code
								</span>
								<span className="p-1 bg-white text-lg text-purple-400 rounded-md">
									{data.user.referalCode}
								</span>
							</div>
						</div>
					</div>

					<EntryLog />
				</>
			) : (
				<>
					<div className="w-full flex flex-col items-center justify-center">
						<div className="z-10 text-center flex flex-col justify-center items-center">
							<img
								className="rounded-full m-2 border-2"
								src={data.user.image}
								alt="User image"
							/>
							<span className="mb-2">{data.user.name}</span>
						</div>

						<div className="-translate-y-14 pt-14 px-3 self-center  bg-yellow-600 w-full pb-2 text-center rounded-xl">
							<QrReader
								constraints={{ facingMode: "user" }}
								onResult={(result, error) => {
									if (result) {
										setScanData(result.getText());
									}

									// if (!!error) {
									// 	console.error(error);
									// }
								}}
								className="w-full"
							/>

							<form
								className="flex gap-3 justify-center items-center"
								onSubmit={handleCodeFormSubmit}
							>
								<input
									value={inputCode}
									onChange={e => setInputCode(e.target.value)}
									type={"text"}
									className="py-2 px-3 text-black rounded-lg"
								/>
								<button
									type="submit"
									className="border-2 px-2 py-1 rounded-full"
								>
									<FaArrowRight />
								</button>
							</form>
						</div>
					</div>

					<EntryLog />
				</>
			)}
		</main>
	);
}
