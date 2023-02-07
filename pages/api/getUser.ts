import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prismadb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, {
		...authOptions,
		session: { strategy: "jwt" },
	});

	if (!session) {
		return res.status(401).json({ message: "User must be login" });
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user?.email! },
		select: {
			email: true,
			referalCode: true,
			location: true,
			id: true,
			name: true,
			image: true,
			role: true,
		},
	});

	res.status(200).json({ user });
}
