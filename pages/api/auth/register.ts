import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import bcrypt from "bcrypt";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const { name, email, userId, password } = req.body;

			const hashPassword = await bcrypt.hash(password, 10);

			const userWithUserId = await prisma.user.findUnique({
				where: { userId },
			});

			if (userWithUserId) {
				return res
					.status(402)
					.json({ message: "Userid already exist" });
			}

			const userWithEmail = await prisma.user.findUnique({
				where: { email },
			});

			if (userWithEmail) {
				return res.status(402).json({ message: "Email already exist" });
			}

			const user = await prisma.user.create({
				data: {
					name,
					email,
					userId,
					password: hashPassword,
				},
			});

			return res.status(201).json(user);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: err });
		}
	}
}
